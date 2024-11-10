class Matches {
    constructor () {
        this.matches = []

        this.createEvents(this)
    }

    createEvents (self) {
        document.getElementById('fileInput').addEventListener('change', function(event) {
            self.addMatch(self, event)
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

class Match {
    constructor (number, data) {
        this.name = `Partida ${ number }`
        this.data = data
    }

    // Time
    // Jogador
    // Vitímas
    // Mortes
    // ASsistências
    // % HSs
    // Destaques
    // DU
    // IC
    // K/D
    // Dano
    // Pontuação
    // Reféns entregues
    // First kill
    // 1x2 win
    // Faca
    // 3k
    // 4k
    // 4k
    // 5k
    // Gastou
    // Tempo vivo
}

const matches = new Matches()

window.matches = matches
