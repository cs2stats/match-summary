$(document).ready(function () {
    console.log('relativePath', relativePath)

    const defaultCover = `${ relativePath }/assets/brand/cs-jackson.png`
    const conditions = ['worse', 'better']

    const highlightsElement = $('#highlights')

    const highlights = [
        {
            title: 'Assassino Implacável',
            description: 'Mais eliminações.',
            attribute: 'kills',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Turista da Agency',
            description: 'Menos eliminações.',
            attribute: 'kills',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: 'Imortal',
            description: 'Menos mortes.',
            attribute: 'deaths',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: 'Ímã de Balas',
            description: 'Mais mortes.',
            attribute: 'deaths',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/f-batista.jpg`,
        },
        {
            title: 'Herói da Agency',
            description: 'Mais reféns resgatados.',
            attribute: '',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: 'Head Shot Machine',
            description: 'Mais headshots (HSs).',
            attribute: 'HSs',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/hs-batista.gif`,
        },
        {
            title: 'Precisão Mortal',
            description: 'Mais %headshots (HSs).',
            attribute: 'enemyHSs',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/hs-batista.gif`,
        },
        {
            title: 'Padeiro',
            description: 'Mais assistências.',
            attribute: 'assists',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Estrela da partida',
            description: 'Mais Destaques.',
            attribute: 'mvps',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Artilheiro Tático',
            description: 'Mais dano com utilitário (DU).',
            attribute: 'utilityDamage',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Conservador de Granadas',
            description: 'Menos dano com utilitário (DU).',
            attribute: 'utilityDamage',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: "Can't you see me?",
            description: 'Mais inimigos cegos (IC).',
            attribute: 'enemiesFlashed',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Luz Suave',
            description: 'Menos inimigos cegos (IC).',
            attribute: 'enemiesFlashed',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: 'Máquina Mortífera',
            description: 'Melhor K/D (Relação Vítimas/Mortes).',
            attribute: 'kd',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Destruidor da Agency',
            description: 'Maior DMR (Dano Médio por Rodada).',
            attribute: 'dmr',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Demolidor',
            description: 'Maior dano total.',
            attribute: 'damage',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Inofensivo',
            description: 'Menor dano total.',
            attribute: 'damage',
            condition: conditions[0],
            cover: defaultCover,
        },
        {
            title: 'Iniciador de Combate',
            description: 'Mais primeiras eliminações nas rodadas.',
            attribute: 'firstKills',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Gladiador Solo',
            description: 'Mais vitórias 1x1.',
            attribute: 'Wins1v1',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'O Improvável',
            description: 'Mais vitórias 1x2.',
            attribute: 'Wins1v2',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Ameaça Tripla',
            description: 'Mais 3 eliminações na mesma rodada (3k).',
            attribute: 'enemy3Ks',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Aniquilador de Quadras',
            description: 'Mais 4 eliminações na mesma rodada (4k).',
            attribute: 'enemy4Ks',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Exterminador Total',
            description: 'Mais 5 eliminações na mesma rodada (5k).',
            attribute: 'enemy5Ks',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Sobrevivente da Agency',
            description: 'Maior tempo vivo.',
            attribute: 'liveTime',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Pistoleiro',
            description: 'Mais eliminações com Pistola.',
            attribute: 'pistolKills',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Carrasco Silencioso',
            description: 'Mais eliminação com Faca.',
            attribute: 'knifeKills',
            condition: conditions[1],
            cover: defaultCover,
        },
        {
            title: 'Sniper',
            description: 'Mais eliminações com Sniper.',
            attribute: 'SniperKills',
            condition: conditions[1],
            cover: defaultCover,
        },
        // {
        //     title: '',
        //     description: '',
        //     attribute: '',
        //     condition: conditions[0],
        //     cover: defaultCover,
        // },
    ]

    function createHighlighElement(highlight) {
        return `
            <div
                id="highlight-${ highlight.condition }-${ highlight.attribute }"
                data-attribute="${ highlight.attribute }"
                data-condition="${ highlight.condition }"
                class="col highlight"
            >
                <div class="card h-100">
                    <img src="${ highlight.cover }" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${ highlight.title }</h5>
                        <p class="card-text ">${ highlight.description }</p>
                        <button for="highlight-${ highlight.condition }-${ highlight.attribute }" class="btn btn-primary" for="">Revelar</button>
                    </div>
                </div>
            </div>
        `
    }

    highlights.forEach((highlight) => {
        highlightsElement.append(createHighlighElement(highlight))
    })

    highlightsElement.on('click', 'button', (e) => {
        if (matches.matchSummary !== null) {
            const highlight = $(`#${ e.target.getAttribute('for') }`)

            const attribute = highlight.data('attribute')
            const condition = highlight.data('condition')

            const player = matches.getPlayerByAttribute(attribute, condition == 'better')

            e.target.remove()

            highlight.find('img').attr('src', playersData[player.id].avatar)
            highlight.find('.card-body').append(`
                <p><b>Resultado</b>: ${ playersData[player.id].name } com ${ player[attribute] }.</p>
            `)
        }
    })
})
