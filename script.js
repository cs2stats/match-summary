class Matches {
    constructor () {
        this.matches = []

        this.inputElement = document.getElementById('fileInput')

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

        lines.forEach(line => {
            line = line.trim()

            if (!line) return // Ignore empty lines
            if (line.endsWith('{')) return // Ignore new object lines

            if (line.endsWith('}')) {
                keys.pop()
                return
            }

            const [key, value] = line.match(/"([^"]*)"/g).map(s => s.replace(/"/g, ''))

            if (key !== undefined && value == undefined) {
                keys.push(key)
            } else if (key !== undefined && value !== undefined) {            
                this.addNestedKeyRecursive(json, keys, key, value)
            }
        })

        return json
    }
}

class Team {
    constructor (reference, data) {
        this.reference = reference
        this.name = data[`team${ reference}`]
        this.players = Object.entries(data[`PlayersOnTeam${ reference }`]).map(([key, value]) => {
            return new Player(this, value, data)
        })

        // this.setPlayers()
    }
}

class Player {
    constructor (team, data, match) {
        this.team = team
        this.name = data.name
        this.kills = data.kills
        this.deaths = data.deaths
        this.assists = data.assists
        this.HSs = data.enemyHSs
        this.enemyHSs = this.roundToTwo((data.enemyHSs / data.kills) * 100)
        this.mvps = data.mvps
        this.utilityDamage = data.MatchStats.Totals.UtilityDamage
        this.enemiesFlashed = data.MatchStats.Totals.EnemiesFlashed
        this.FlashSuccesses = data.MatchStats.Totals.FlashSuccesses
        this.kd = this.roundToTwo(data.kills / data.deaths)
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
        this.minutesLive = this.formatLiveTime(data.MatchStats.Totals.LiveTime)
    }

    roundToTwo (num) {
        return +(Math.round(num + "e+2")  + "e-2")
    }

    formatLiveTime (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
    
        return `${minutes}:${String(seconds).padStart(2, '0')}`
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

    getPlayersByMPVPoint () {
        console.log()
    }

    getPlayersByTeam (team) {
        return team.players.map(player => `
            <tr>
                <th>${ player.name }</th>
                <th class="text-center">${ player.kills }</th>
                <th class="text-center">${ player.deaths }</th>
                <th class="text-center">${ player.assists }</th>
                <th class="text-center">${ player.damage }</th>
                <th class="text-center">${ player.HSs }</th>
                <th class="text-center">${ player.enemyHSs }</th>
                <th class="text-center">${ player.mvps }</th>
                <th class="text-center">${ player.utilityDamage }</th>
                <th class="text-center">${ player.enemiesFlashed }</th>
                <th class="text-center">${ player.kd }</th>
                <th class="text-center">${ player.dmr }</th>
                <th class="text-center">${ player.score }</th>
                <th class="text-center">${ player.objective }</th>
                <th class="text-center">${ player.firstKills }</th>
                <th class="text-center">${ player.Wins1v2 }</th>
                <th class="text-center">${ player.knifeKills }</th>
                <th class="text-center">${ player.enemy3Ks }</th>
                <th class="text-center">${ player.enemy4Ks }</th>
                <th class="text-center">${ player.enemy5Ks }</th>
                <th class="text-center">${ player.equipmentValue }</th>
                <th class="text-center">${ player.minutesLive }</th>
            </tr>
        `).join('')

        // objective
        // FlashSuccesses
        // Wins1v1
        // Wins1v2
        // cashEarned
        // clutchKs
        // enemy2Ks
        // enemy3Ks
        // enemy4Ks
        // enemy5Ks
        // entryCount
        // entryWins
        // equipmentValue
        // firstKills
        // knifeKills
        // liveTime
        // score
    }

    createMatchSection (self) {
        $.get('match.html', function(matchData) {
            matchData = matchData.replace('{{matchId}}', self.id)
            matchData = matchData.replace('{{matchName}}', self.name)
        
            const teamPromises = Array(2).fill(0).map((_, i) => {
                return $.get('team.html').then(function(teamData) {
                    // Substitui placeholders no arquivo team.html
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

    createTeamsSection (self) {
        console.log($('match-1'))
    }
}

const matches = new Matches()

window.matches = matches

// content.load(`templates/${ switchLanguage ? language.code : '' }/${ path }.html`, function() {
//     if (!['album', 'author', 'music'].includes(currentContent.content)) {
//         updateLanguage()
//     }
// })


// if ($(window).width() < 768 && $('#sidebar').width() > 250) {
//     $('#sidebar').toggleClass('toggled')
// }
