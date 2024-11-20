$(document).ready(function () {
    class Matches {
        constructor () {
            this.matches = []

            this.inputElement = document.getElementById('fileInput')
            this.matchSummary = null

            this.specialAttributes = {
                assignOnce: ['name', 'team'],
                ignore: ['minutesLive'],
                calculateAtTheEnd: ['kd', 'enemyHSs'],
            }

            this.createEvents(this)
        }

        createEvents (self) {
            if (this.inputElement !== null) {
                this.inputElement.addEventListener('change', function(event) {
                    self.addMatchFromEvent(self, event)
                    self.inputElement.value = ''
                })
            }
        }

        addMatch(textContent) {
            const jsonObject = this.parseToJSON(textContent)

            const match = new Match(this.matches.length + 1, jsonObject)

            this.matches.push(match)

            this.generateMatchSummary()
            this.updatePodium()
        }

        addMatchFromEvent(self, event) {
            const file = event.target.files[0]

            if (file) {
                const reader = new FileReader()
        
                reader.onload = function(e) {
                    self.addMatch(e.target.result)
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
                        }
                    })
                })
            })

            for (const [id, player] of Object.entries(matchSummary)) {                
                this.specialAttributes.calculateAtTheEnd.forEach(key => {
                    switch (key) {
                        case 'enemyHSs':
                            player[key] = formatTwoDecimalPlaces((player.HSs / player.kills) * 100)
                            break
                        case 'kd':
                            player[key] = formatTwoDecimalPlaces(player.kills / player.deaths)
                            break
                        default:
                            break
                    }
                })
            }

            this.setMatchSummary(matchSummary)
        }

        setMatchSummary(matchSummary) {
            this.matchSummary = sortObjectByAttribute(matchSummary, 'mvpScore')
        }

        getPlayerByAttribute(attribute, isMax=true) {
            return Object.values(this.matchSummary).reduce((selectedPlayer, currentPlayer) => {
                const comparison = isMax
                    ? currentPlayer[attribute] > selectedPlayer[attribute]
                    : currentPlayer[attribute] < selectedPlayer[attribute]

                return comparison ? currentPlayer : selectedPlayer
            })
        }

        getDetailMatchesPlayerLine (position, player) {
            return `
                <tr>
                    <th>${ position }º</th>
                    <th>${ playersData[player.id].name }</th>
                    <th>${ player.team.name }</th>
                    <th class="text-center">${ player.kills }</th>
                    <th class="text-center">${ player.deaths }</th>
                    <th class="text-center">${ player.assists }</th>
                    <th class="text-center">${ player.kd }</th>
                    <th class="text-center">${ player.objective }</th>
                    <th class="text-center">${ player.mvps }</th>
                    <th class="text-center">${ player.HSs }</th>
                    <th class="text-center">${ player.enemyHSs }</th>
                    <th class="text-center">${ player.utilityDamage }</th>
                    <th class="text-center">${ player.enemiesFlashed }</th>
                    <th class="text-center">${ player.damage }</th>
                    <th class="text-center">${ player.dmr }</th>
                    <th class="text-center">${ player.firstKills }</th>
                    <th class="text-center">${ player.Wins1v1 }</th>
                    <th class="text-center">${ player.Wins1v2 }</th>
                    <th class="text-center">${ player.enemy3Ks }</th>
                    <th class="text-center">${ player.enemy4Ks }</th>
                    <th class="text-center">${ player.enemy5Ks }</th>
                    <th class="text-center">${ player.knifeKills }</th>
                    <th class="text-center">${ player.pistolKills }</th>
                    <th class="text-center">${ player.SniperKills }</th>
                    <th class="text-center">${ formatLiveTime(player.liveTime) }</th>
                    <th class="text-center">${ player.score }</th>
                    <th class="text-center">${ player.equipmentValue.toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }</th>
                    <th class="text-center">${ player.mvpScore }</th>
                </tr>
            `
        }

        getDetailScorePlayerLine (position, player) {
            return `
                <tr>
                    <th>${ position }º</th>
                    <th>${ playersData[player.id].name }</th>
                    <th>${ player.team.name }</th>
                    <th class="text-center">${ formatDecimal(player.scoreKills) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreDeaths) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreAssists) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreKD) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreObjective) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreHighlights) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreHS) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreUtilityDamage) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreEnemiesFlashed) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreDamage) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreFirstKills) }</th>
                    <th class="text-center">${ formatDecimal(player.score1v1) }</th>
                    <th class="text-center">${ formatDecimal(player.score2v1) }</th>
                    <th class="text-center">${ formatDecimal(player.score3Kills) }</th>
                    <th class="text-center">${ formatDecimal(player.score4Kills) }</th>
                    <th class="text-center">${ formatDecimal(player.score5Kills) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreKnife) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreKillsPistol) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreKillsSniper) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreRoundsWithoutDying) }</th>
                    <th class="text-center">${ formatDecimal(player.scoreTimeAlive) }</th>
                    <th class="text-center">${ formatDecimal(player.mvpScore) }</th>
                </tr>
            `
        }

        updatePodium() {
            $('table#detailsMatchesPlayers tbody').empty()
            $('table#detailsScorePlayers tbody').empty()

            this.matchSummary.forEach((player, index) => {
                const position = index + 1

                $(`#podium [podium-name=${ position }]`).text(playersData[player.id].name)
                $(`#podium [podium-score=${ position }]`).text(formatDecimal(player.mvpScore))

                if (position <= 3) {
                    $(`#podium [podium-photo=${ position }]`).attr('src', `${ playersData[player.id].avatar }`)
                }

                $('table#detailsMatchesPlayers tbody').append(this.getDetailMatchesPlayerLine(position, player))
                $('table#detailsScorePlayers tbody').append(this.getDetailScorePlayerLine(position, player))
            })

            $('p.details-info').hide()
        }
    }

    class Match {
        constructor (number, data) {
            this.id = number
            this.name = `Partida ${ number }`
            this.data = data

            this.roundResultTeam1 = data['FirstHalfScore']['team1'] + data['SecondHalfScore']['team1']
            this.roundResultTeam2 = data['FirstHalfScore']['team2'] + data['SecondHalfScore']['team2']

            this.teams = [
                new Team('1', data),
                new Team('2', data)
            ]

            this.result = `${ this.teams[0].name } <b>${ this.roundResultTeam1 }:${ this.roundResultTeam2 }</b> ${ this.teams[1].name }`

            this.createMatchSection(this)
        }

        createMatchSection (self) {
            $.get(`${ relativePath }/templates/match.html`, function(matchData) {
                matchData = matchData.replace('{{matchId}}', self.id)
                matchData = matchData.replace('{{matchName}}', self.name)
                matchData = matchData.replace('{{matchResult}}', self.result)
            
                const teamPromises = Array(2).fill(0).map((_, i) => {
                    return $.get(`${ relativePath }/templates/team.html`).then(function(teamData) {
                        teamData = teamData.replace('{{teamName}}', `${self.teams[i].name}`)
                        teamData = teamData.replace('{{firstHalfScore}}', `${self.teams[i].firstHalfScore}`)
                        teamData = teamData.replace('{{secondHalfScore}}', `${self.teams[i].secondHalfScore}`)
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
                </tr>
            `).join('')
        }
    }

    class Team {
        constructor (reference, data) {
            this.reference = reference
            this.name = data[`team${ reference}`]
            this.firstHalfScore = data['FirstHalfScore'][`team${ reference}`]
            this.secondHalfScore = data['SecondHalfScore'][`team${ reference}`]
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
            this.kd = formatTwoDecimalPlaces(data.kills / data.deaths)
            this.assists = data.assists
            this.HSs = data.enemyHSs
            this.enemyHSs = formatTwoDecimalPlaces((data.enemyHSs / data.kills) * 100)
            this.mvps = data.mvps
            this.utilityDamage = data.MatchStats.Totals.UtilityDamage
            this.enemiesFlashed = data.MatchStats.Totals.EnemiesFlashed
            this.FlashSuccesses = data.MatchStats.Totals.FlashSuccesses
            this.damage = data.MatchStats.Totals.Damage
            this.score = data.score
            this.objective = data.MatchStats.Totals.Objective
            this.firstKills = data.firstKs
            this.knifeKills = data.kills_knife
            this.pistolKills = data.kills_weapon_pistol
            this.SniperKills = data.kills_weapon_sniper
            this.clutchKs = data.clutchKs
            this.dmr = formatTwoDecimalPlaces((data.MatchStats.Totals.Damage / match.round))

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
            this.scoreAssists = data.assists * 0.5 // Assistências
            this.scoreKD = this.kd * 2 // KD
            this.scoreObjective = this.objective * 2 // Destaques
            this.scoreHighlights = data.mvps * 2 // Destaques
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
                this.scoreAssists +
                this.scoreKD +
                this.scoreObjective +
                this.scoreHighlights +
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
    }

    const matches = new Matches()

    window.matches = matches
})
