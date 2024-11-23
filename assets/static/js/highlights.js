$(document).ready(function () {
    const defaultCover = `${ relativePath }/assets/brand/cs-jackson.png`
    const conditions = ['worse', 'better']

    const highlights = [
        {
            title: '⚔️ Assassino Implacável',
            description: 'Mais eliminações.',
            attribute: 'kills',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Matador' },
            },
        },
        {
            title: '🧳 Turista da Agency',
            description: 'Menos eliminações.',
            attribute: 'kills',
            condition: conditions[0],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '⚰️ Ímã de Balas',
            description: 'Mais mortes.',
            attribute: 'deaths',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/f-batista.jpg`,
            awards: {
                '2.0': { description: 'Adesivo | Tarde Demais' },
            },
        },
        {
            title: '🛡️ Imortal',
            description: 'Menos mortes.',
            attribute: 'deaths',
            condition: conditions[0],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '🎰 Máquina Mortífera',
            description: 'Melhor K/D (Relação Vítimas/Mortes).',
            attribute: 'kd',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Emblema | Acerto de Contas' },
            },
        },
        {
            title: '🍞 Padeiro',
            description: 'Mais assistências.',
            attribute: 'assists',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Espectradores' },
            },
        },
        {
            title: '▶️ Iniciador de Combate',
            description: 'Mais primeiras eliminações nas rodadas.',
            attribute: 'firstKills',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Emblema | Bravo' },
            },
        },
        {
            title: '⭐ Estrela da partida',
            description: 'Mais Destaques.',
            attribute: 'mvps',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | A Volta da Estrela Cadente' },
            },
        },
        {
            title: '🦸 Herói da Agency',
            description: 'Mais reféns resgatados.',
            attribute: 'objective',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Resgate de Refém' },
            },
        },
        {
            title: '🤯 Head Shot Machine',
            description: 'Mais Headshots (HSs).',
            attribute: 'HSs',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/hs-batista.gif`,
            awards: {
                '2.0': { description: 'Adesivo | Um Tiro, Uma Morte' },
            },
        },
        {
            title: '🤕 Precisão Mortal',
            description: 'Maior % Headshots (HSs).',
            attribute: 'enemyHSs',
            condition: conditions[1],
            cover: `${ relativePath }/assets/covers/hs-batista.gif`,
            awards: {
                '2.0': { description: 'Adesivo | Guardião Mestre de Elite' },
            },
        },
        {
            title: '💣 Artilheiro Tático',
            description: 'Mais dano com utilitário (DU).',
            attribute: 'utilityDamage',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Homem-Granada' },
            },
        },
        {
            title: '🎒 Conservador de Granadas',
            description: 'Menos dano com utilitário (DU).',
            attribute: 'utilityDamage',
            condition: conditions[0],
            cover: defaultCover,
            awards: {},
        },
        {
            title: "💥 Can't you see me?",
            description: 'Mais inimigos cegos (IC).',
            attribute: 'enemiesFlashed',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Pixels Separatistas' },
            },
        },
        {
            title: '🔨 Destruidor da Agency',
            description: 'Maior DMR (Dano Médio por Rodada).',
            attribute: 'dmr',
            condition: conditions[1],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '⚒️ Demolidor',
            description: 'Maior dano total.',
            attribute: 'damage',
            condition: conditions[1],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '👶 Inofensivo',
            description: 'Menor dano total.',
            attribute: 'damage',
            condition: conditions[0],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '🔫 Pistoleiro',
            description: 'Mais eliminações com Pistola.',
            attribute: 'pistolKills',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Chaveiro | Tricô Silencioso' },
            },
        },
        {
            title: '🎯 Sniper',
            description: 'Mais eliminações com Sniper.',
            attribute: 'sniperKills',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Chaveiro | AWP de Bolso' },
            },
        },
        {
            title: '🗡️ Carrasco Silencioso',
            description: 'Mais eliminação com Faca.',
            attribute: 'knifeKills',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Chaveiro | Faca Talhada' },
            },
        },
        {
            title: '👤 Gladiador Solo',
            description: 'Mais vitórias 1x1.',
            attribute: 'Wins1v1',
            condition: conditions[1],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '👥 O Improvável',
            description: 'Mais vitórias 1x2.',
            attribute: 'Wins1v2',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Clutch ou Kick' },
            },
        },
        {
            title: '👪 Ameaça Tripla',
            description: 'Mais 3 eliminações na mesma rodada (3k).',
            attribute: 'enemy3Ks',
            condition: conditions[1],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '👨‍👩‍👦‍👦 Aniquilador de Quadras',
            description: 'Mais 4 eliminações na mesma rodada (4k).',
            attribute: 'enemy4Ks',
            condition: conditions[1],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '🕶️ Exterminador Total',
            description: 'Mais 5 eliminações na mesma rodada (5k).',
            attribute: 'enemy5Ks',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Exterminação' },
            },
        },
        {
            title: '💸 Esbanjador',
            description: 'Mais dinheiro gasto.',
            attribute: 'equipmentValue',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Dinheiro Sujo' },
            },
        },
        {
            title: '🐄 Mão de vaca',
            description: 'Menos dinheiro gasto.',
            attribute: 'equipmentValue',
            condition: conditions[0],
            cover: defaultCover,
            awards: {},
        },
        {
            title: '⏳ Sobrevivente da Agency',
            description: 'Maior tempo vivo.',
            attribute: 'liveTime',
            condition: conditions[1],
            cover: defaultCover,
            awards: {
                '2.0': { description: 'Adesivo | Saudações' },
            },
        },
        // {
        //     title: '',
        //     description: '',
        //     attribute: '',
        //     condition: conditions[0],
        //     cover: defaultCover,
        //    awards: {//    },
        // },
    ]

    const highlightsElement = $('#highlights')

    function createHighlighElement(index, highlight) {
        const award = highlight.awards[mvpVersion]

        return `
            <div
                id="highlight-${ highlight.condition }-${ highlight.attribute }"
                data-attribute="${ highlight.attribute }"
                data-condition="${ highlight.condition }"
                data-award="${ award !== undefined ? true : false }"
                data-award-description="${ award ? award.description : undefined }"
                data-index="${ index }"
                class="col-4 col-xxl-3 col-md-6 col-sm-6 highlight ${ index !== 0 ? 'blur' : '' }"
            >
                <div class="card h-100">
                    <img src="${ highlight.cover }" class="card-img-top cover animate__animated">
                    <img src="${ highlight.cover }" class="card-img-top winner d-none position-absolute animate__animated">
                    <div class="card-body">
                        <h5 class="card-title">${ highlight.title }</h5>
                        <p class="card-text ">${ highlight.description }</p>
                        <button for="highlight-${ highlight.condition }-${ highlight.attribute }" class="btn btn-primary reveal" for="">Revelar</button>
                    </div>
                </div>
            </div>
        `
    }

    $('main').on('click', 'button.award', function(e) {
        const target = $(this)

        $('#modal-award .modal-body p').text(target.data('description'))
        $('#modal-award .modal-body img').attr('src', target.data('src'))
    })

    highlights.forEach((highlight, index) => {
        highlightsElement.append(createHighlighElement(index, highlight))
    })

    highlightsElement.on('click', 'button.reveal', (e) => {
        if (matches.matchSummary !== null) {
            const highlight = $(`#${ e.target.getAttribute('for') }`)

            const index = highlight.data('index')
            const attribute = highlight.data('attribute')
            const awardDescription = highlight.data('awardDescription')
            const condition = highlight.data('condition')
            const award = highlight.data('award')

            const player = matches.getPlayerByAttribute(attribute, condition == 'better')

            if (highlight.hasClass('blur')) {
                return
            }

            highlightsElement.find(`.highlight[data-index=${ index + 1 }]`).removeClass('blur')

            e.target.remove()

            if (player[attribute] > 0) {
                formatedAttr = 0

                if (attribute === 'liveTime')
                    formatedAttr = formatLiveTime(player[attribute])
                else if (attribute === 'equipmentValue')
                    formatedAttr = player[attribute].toLocaleString('en-US', {style: 'currency', currency: 'USD',})
                else
                    formatedAttr = player[attribute]

                highlight.find('img.cover').addClass('animate__hinge')
                highlight.find('img.winner').attr('src', playersData[player.id].avatar)
                highlight.find('img.winner').removeClass('d-none')
                highlight.find('img.winner').addClass('animate__fadeIn')

                setTimeout(() => {
                    highlight.find('img.winner').removeClass('position-absolute')
                    highlight.find('img.cover').addClass('d-none')
                }, 2000)

                highlight.find('.card-body').append(`
                    <p><b>Resultado</b>: ${ playersData[player.id].name } com ${ formatedAttr }.</p>
                `)
            } else {
                highlight.find('img').attr('src',  `${ relativePath }/assets/brand/cs2-sad.png`)
                highlight.find('.card-body').append(`
                    <p><b>Resultado</b>: ninguém.</p>
                `)
            }

            setTimeout(() => {
                if (award) {
                    highlight.find('.card-body').append(`
                        <button
                            for="highlight-better-kills"
                            class="btn btn-sm btn-outline-dark award animate__animated animate__tada"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-award"
                            data-src="${ relativePath }/assets/awards/${ mvpVersion }/${ attribute }.png",
                            data-description="${ awardDescription }"
                        >
                            🎁 Prêmio
                        </button>
                    `)
                }
            }, 2250);
        }
    })

    $('button.reveal').click()
})
