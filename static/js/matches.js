class Matches {
    constructor () {
        this.matches = []

        this.inputElement = document.getElementById('fileInput')
        this.matchSummary = null

        this.specialAttributes = {
            assignOnce: ['name', 'team'],
            ignore: ['minutesLive'],
            formatLast: ['liveTime'],
        }

        this.createEvents(this)
    }

    createEvents (self) {
        this.inputElement.addEventListener('change', function(event) {
            self.addMatch(self, event)
            self.inputElement.value = ''
        })
    }

    addMatch (self, event) {
        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader()
    
            reader.onload = function(e) {
                const textContent = e.target.result
                const jsonObject = self.parseToJSON(textContent)

                const match = new Match(self.matches.length + 1, jsonObject)

                self.matches.push(match)

                self.generateMatchSummary()
                self.updatePodium()
            }

            reader.readAsText(file)
        }
    }

    getMatchByName () {
        this.matches.push()
    }
    
    addNestedKeyRecursive(obj, keys, newKey, value, index = 0) {
        if (index === keys.length) {
            obj[newKey] = !isNaN(value.replace(',', '.')) && value !== "" ? Number(value) :value
            return
        }
    
        const key = keys[index]

        if (!obj[key]) {
            obj[key] = {}
        }
    
        this.addNestedKeyRecursive(obj[key], keys, newKey, value, index + 1)
    }

    parseToJSON(text) {
        const lines = text.split('\n').slice(2) // Ignore first two lines

        let keys = []
        let json = {}

        lines.forEach((line, index) => {
            line = line.trim()

            if (!line) return // Ignore empty lines
            if (line.endsWith('{')) return // Ignore new object lines

            if (line.endsWith('}')) {
                keys.pop()
                return
            }

            const [key, value] = line.match(/"([^"]*)"/g).map(s => s.replace(/"/g, ''))

            if (key === 'name') {
                this.addNestedKeyRecursive(json, keys, 'id', lines[index - 2].match(/"([^"]*)"/)[1])
            }

            if (key !== undefined && value == undefined) {
                keys.push(key)
            } else if (key !== undefined && value !== undefined) {            
                this.addNestedKeyRecursive(json, keys, key, value)
            }
        })

        return json
    }

    generateMatchSummary() {
        const matchSummary = {}
      
        this.matches.forEach((match, matchIndex) => {
            const isLastIteration = matchIndex === matches.length - 1

            Object.values(match.teams).forEach(team => {
                team.players.forEach(player => {
                    const { id, name, ...stats } = player
            
                    if (!matchSummary[id]) {
                        matchSummary[id] = { id, name, ...Object.fromEntries(Object.keys(stats).map(key => [key, 0])) }
                    }

                    for (const [key, value] of Object.entries(stats)) {
                        if (this.specialAttributes.ignore.includes(key)) {
                          continue
                        }

                        if (this.specialAttributes.assignOnce.includes(key)) {
                            if (matchSummary[id][key] === 0) {
                                matchSummary[id][key] = value;
                            }
                        } else {
                            matchSummary[id][key] = parseFloat((matchSummary[id][key] + Number(value)).toFixed(2))
                        }

                        if (isLastIteration && this.specialAttributes.formatLast.includes(key)) {
                            matchSummary[id][key] = formatLiveTime(matchSummary[id][key])
                        }
                    }
                })
            })
        })

        this.setMatchSummary(matchSummary)
    }

    setMatchSummary(matchSummary) {
        this.matchSummary = sortObjectByAttribute(matchSummary, 'mvpScore')
    }

    getPlayerWithMaxAttribute(attribute) {
        return Object.values(this.matchSummary).reduce((maxPlayer, currentPlayer) => {
            return currentPlayer[attribute] > maxPlayer[attribute] ? currentPlayer : maxPlayer
        })
    }

    updatePodium() {
        this.matchSummary.forEach((player, index) => {
            console.log(player, index + 1)

            $(`#podium [podium-score=${ index + 1 }]`).text(player.mvpScore.toString().replace('.', ','))
            $(`#podium [podium-name=${ index + 1 }]`).text(playersData[player.id].name)

            if (index + 1 <= 3) {
                $(`#podium [podium-photo=${ index + 1 }]`).attr('src', `${ playersData[player.id].avatar }`)
            }
        })
    }
}

class Match {
    constructor (number, data) {
        this.id = number
        this.name = `Partida ${ number }`
        this.data = data

        this.teams = [
            new Team('1', data),
            new Team('2', data)
        ]

        this.createMatchSection(this)
    }

    createMatchSection (self) {
        $.get('templates/match.html', function(matchData) {
            matchData = matchData.replace('{{matchId}}', self.id)
            matchData = matchData.replace('{{matchName}}', self.name)
        
            const teamPromises = Array(2).fill(0).map((_, i) => {
                return $.get('templates/team.html').then(function(teamData) {
                    teamData = teamData.replace('{{teamName}}', `${self.teams[i].name}`)
                    teamData = teamData.replace('{{players}}', self.getPlayersByTeam(self.teams[i]))
        
                    return teamData
                })
            })

            Promise.all(teamPromises).then((teamContents) => {
                const $matchContent = $('<div>').html(matchData)
        
                teamContents.forEach((teamContent) => {
                    $matchContent.find(`#match-${self.id} .teams`).append(teamContent)
                })

                $('#matches').append($matchContent.html())
            })
        })        
    }

    getPlayersByTeam (team) {
        return team.players.map(player => `
            <tr>
                <th>${ player.name }</th>
                <th class="text-center">${ player.kills }</th>
                <th class="text-center">${ player.deaths }</th>
                <th class="text-center">${ player.assists }</th>
                <th class="text-center">${ player.HSs }</th>
                <th class="text-center">${ player.enemyHSs }</th>
                <th class="text-center">${ player.mvps }</th>
                <th class="text-center">${ player.utilityDamage }</th>
                <th class="text-center">${ player.enemiesFlashed }</th>
                <th class="text-center">${ player.kd }</th>
                <th class="text-center">${ player.dmr }</th>
                <th class="text-center">${ player.damage }</th>
                <th class="text-center">${ player.objective }</th>
                <th class="text-center">${ player.firstKills }</th>
                <th class="text-center">${ player.Wins1v1 }</th>
                <th class="text-center">${ player.Wins1v2 }</th>
                <th class="text-center">${ player.knifeKills }</th>
                <th class="text-center">${ player.enemy3Ks }</th>
                <th class="text-center">${ player.enemy4Ks }</th>
                <th class="text-center">${ player.enemy5Ks }</th>
                <th class="text-center">${ player.equipmentValue.toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }</th>
                <th class="text-center">${ player.minutesLive }</th>
                <th class="text-center">${ player.score }</th>
            </tr>
        `).join('')
    }
}

class Team {
    constructor (reference, data) {
        this.reference = reference
        this.name = data[`team${ reference}`]
        this.players = Object.entries(data[`PlayersOnTeam${ reference }`]).map(([key, value]) => {
            return new Player(this, value, data)
        })
    }
}

class Player {
    constructor (team, data, match) {
        this.id = data.id
        this.team = team
        this.name = data.name
        this.kills = data.kills
        this.deaths = data.deaths
        this.kd = this.roundToTwo(data.kills / data.deaths)
        this.assists = data.assists
        this.HSs = data.enemyHSs
        this.enemyHSs = this.roundToTwo((data.enemyHSs / data.kills) * 100)
        this.mvps = data.mvps
        this.utilityDamage = data.MatchStats.Totals.UtilityDamage
        this.enemiesFlashed = data.MatchStats.Totals.EnemiesFlashed
        this.FlashSuccesses = data.MatchStats.Totals.FlashSuccesses
        this.damage = data.MatchStats.Totals.Damage
        this.score = data.score
        this.objective = data.MatchStats.Totals.Objective
        this.firstKills = data.firstKs
        this.knifeKills = data.kills_knife
        this.clutchKs = data.clutchKs
        this.dmr = this.roundToTwo((data.MatchStats.Totals.Damage / match.round))

        this.Count1v1 = data.MatchStats.Totals['1v1Count']
        this.Wins1v1 = data.MatchStats.Totals['1v1Wins']
        this.Count1v2 = data.MatchStats.Totals['1v2Count']
        this.Wins1v2 = data.MatchStats.Totals['1v2Wins']

        this.enemy2Ks = data.enemy2Ks
        this.enemy3Ks = data.enemy3Ks
        this.enemy4Ks = data.enemy4Ks
        this.enemy5Ks = data.enemy5Ks

        this.cashEarned = data.MatchStats.Totals.CashEarned
        this.entryCount = data.MatchStats.Totals.EntryCount
        this.entryWins = data.MatchStats.Totals.EntryWins
        this.equipmentValue = data.MatchStats.Totals.EquipmentValue
        this.liveTime = data.MatchStats.Totals.LiveTime
        this.minutesLive = formatLiveTime(data.MatchStats.Totals.LiveTime)

        // Score

        this.scoreKills = data.kills * 1 // Vítimas
        this.scoreDeaths = data.deaths * -0.5 // Mortes
        this.scoreKD = this.kd * 2 // KD
        this.scoreHighlights = data.mvps * 2 // Destaques
        this.scoreAssists = data.assists * 0.5 // Assistências
        this.scoreDamage = this.damage / 100 // Dano
        this.scoreHS = this.enemyHSs * 0.1 // % HS
        this.scoreUtilityDamage = (this.utilityDamage / 10) * 0.1 // Dano com utilitário
        this.scoreEnemiesFlashed = this.enemiesFlashed * 0.1 // Inimigo cego
        this.scoreFirstKills = data.firstKs * 0.5 // Primeira eliminação do round
        this.score1v1 = this.Count1v1 * 1 //1x1
        this.score2v1 = this.Count1v1 * 2 //2x1
        this.score3Kills = this.enemy3Ks * 1 // 3 Eliminações no round
        this.score4Kills = this.enemy4Ks * 3 // 4 Eliminações no round
        this.score5Kills = this.enemy5Ks * 5 // 5 Eliminações no round
        this.scoreKnife = data.kills_knife * 5 // Eliminação com Faca
        this.scoreKillsPistol = data.kills_weapon_pistol * 0.5 // Eliminações com Pistola
        this.scoreKillsSniper = data.kills_weapon_sniper * 0.25 // Eliminações com Sniper
        this.scoreRoundsWithoutDying = match.round - data.deaths // Rounds sem morrer
        this.scoreTimeAlive = (this.liveTime / 60) * 1 // Tempo vivo

        this.mvpScore = (
            this.scoreKills +
            this.scoreDeaths +
            this.scoreKD +
            this.scoreHighlights +
            this.scoreAssists +
            this.scoreDamage +
            this.scoreHS +
            this.scoreUtilityDamage +
            this.scoreEnemiesFlashed +
            this.scoreFirstKills +
            this.score1v1 +
            this.score2v1 +
            this.score3Kills +
            this.score4Kills +
            this.score5Kills +
            this.scoreKnife +
            this.scoreKillsPistol +
            this.scoreKillsSniper +
            this.scoreRoundsWithoutDying +
            this.scoreTimeAlive
        ).toFixed(2)
    }

    roundToTwo (num) {
        return +(Math.round(num + "e+2")  + "e-2")
    }
}

const matches = new Matches()

window.matches = matches
