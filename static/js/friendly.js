$(document).ready(function () {
    const scripts = [
        '/static/js/utils.js',
        '/static/js/players.js',
        '/static/js/mvp.js',
        '/static/js/matches.js',
        '/static/js/highlights.js',
    ]

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.type = 'text/javascript'
            script.onload = () => resolve(src)
            script.onerror = () => reject(new Error(`Erro ao carregar o script: ${src}`))
            document.body.appendChild(script)
        })
    }

    function readFiles () {
        const fileList = Array.from({ length: fileCount }, (_, i) => `/static/friendlies/${ friendlyNumber }/${i + 1}.txt`)

        const promises = fileList.map(file => 
            fetch(file)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Erro ao carregar ${file}: ${response.statusText}`)
                }
                return response.text()
              })
          )

          Promise.all(promises)
            .then(contents => {
              contents.forEach(content => {
                matches.addMatch(content)
              })

              $('#highlights .highlight button').click()
            })
            .catch(error => {
              console.error('Erro ao ler os arquivos:', error)
            })

    }

    $.get('/templates/friendly/main.html', function (mainData) {
        $('body').append(mainData)

        scripts.reduce((promise, script) => {
            return promise.then(() => loadScript(script))
        }, Promise.resolve())
        .then(() => {
            readFiles()
        })
        .catch(error => {
            console.error(error.message)
        })
    })
})