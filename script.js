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

            const [key, value] = line.split(/\s+/).map(str => str.replace(/"/g, '').trim())

            if (line.endsWith('}')) {
                keys.pop()
            } else if (key !== undefined && value == undefined) {
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
            return new Player(this, value)
        })

        console.log(this.players)

        // this.setPlayers()
    }
}

class Player {
    constructor (team, data) {
        this.team = team
        this.name = data.name
        this.kills = data.kills
        this.deaths = data.deaths
        this.assists = data.assists
        this.enemyHSs = (data.enemyHSs / data.kills) * 100
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
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
}

class Match {
    constructor (number, data) {
        this.name = `Partida ${ number }`
        this.data = data

        this.teams = [
            new Team('1', data),
            new Team('2', data)
        ]
    }

    getPlayersStats () {}
}

const matches = new Matches()

window.matches = matches
