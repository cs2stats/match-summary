const projectName = 'match-summary'

function getRelativePath() {
    const segments = window.location.pathname.substring(1).split('/').filter(segment => segment !== '')
    const index = segments.indexOf(projectName)

    return index !== -1 ? `/${ projectName }` : ''
}

const relativePath = getRelativePath()

const mvpScores = {
    '1.0': {
        kills: {
            data: 'Vítimas',
            measure: '1',
            score: '1',
            calculate: (value) => { return value * 1 },
        },
        assists: {
            data: 'Assistências',
            measure: '1',
            score: '1',
            calculate: (value) => { return value * 1 },
        },
    },
    '2.0': {
        kills: {
            data: 'Vítimas',
            measure: '1',
            score: '1',
            calculate: function (value) {
                return value * 1
            },
        },
        deaths: {
            data: 'Mortes',
            measure: '1',
            score: '-0,5',
            calculate: function (value) {
                return value * -0.5
            },
        },
        assists: {
            data: 'Assistências',
            measure: '1',
            score: '0,5',
            calculate: function (value) {
                return value * 0.5
            },
        },
        kd: {
            data: 'KD',
            measure: 'Total',
            score: 'x2',
            calculate: function (value) {
                return value * 2
            },
        },
        objective: {
            data: 'Reféns entregues',
            measure: '1',
            score: '2',
            calculate: function (value) {
                return value * 2
            },
        },
        mvps: {
            data: 'Destaques',
            measure: '1',
            score: '2',
            calculate: function (value) {
                return value * 2
            },
        },
        damage: {
            data: 'Dano',
            measure: '100',
            score: '1',
            calculate: function (value) {
                return (value / 100) * 1
            },
        },
        enemyHSs: {
            data: '% HS',
            measure: 'Total',
            score: '10%',
            calculate: function (value) {
                return value *  0.1
            },
        },
        utilityDamage: {
            data: 'Dano com utilitárias ',
            measure: '10',
            score: '0,10',
            calculate: function (value) {
                return (value / 10) * 0.1
            },
        },
        enemiesFlashed: {
            data: 'Inimigo cego',
            measure: '1',
            score: '0,10',
            calculate: function (value) {
                return value * 0.1
            },
        },
        firstKs: {
            data: 'Primeira eliminação do round',
            measure: '1',
            score: '0,5',
            calculate: function (value) {
                return value * 0.5
            },
        },
        Count1v1: {
            data: '1x1',
            measure: '1',
            score: '1',
            calculate: function (value) {
                return value * 1
            },
        },
        Count1v2: {
            data: '1x2',
            measure: '1',
            score: '2',
            calculate: function (value) {
                return value * 1
            },
        },
        enemy3Ks: {
            data: '3 Eliminações no round',
            measure: '1',
            score: '1',
            calculate: function (value) {
                return value * 1
            },
        },
        enemy4Ks: {
            data: '4 Eliminações no round',
            measure: '1',
            score: '3',
            calculate: function (value) {
                return value * 3
            },
        },
        enemy5Ks: {
            data: '5 Eliminações no round',
            measure: '1',
            score: '5',
            calculate: function (value) {
                return value * 5
            },
        },
        killsKnife: {
            data: 'Eliminação com Faca',
            measure: '1',
            score: '5',
            calculate: function (value) {
                return value * 5
            },
        },
        killsPistol: {
            data: 'Eliminações com Pistola',
            measure: '1',
            score: '0,5',
            calculate: function (value) {
                return value * 0.5
            },
        },
        killsSniper: {
            data: 'Eliminações com Sniper',
            measure: '1',
            score: '0,25',
            calculate: function (value) {
                return value * 0.25
            },
        },
        roundWithoutDying: {
            data: 'Rounds sem morrer',
            measure: '1',
            score: '1',
            calculate: function (value) {
                return value * 1
            },
        },
        liveTime: {
            data: 'Tempo vivo',
            measure: '60s',
            score: '1',
            calculate: function (value) {
                return (value / 60) * 1
            },
        },
    }
}

const defaultCover = `${ relativePath }/assets/brand/cs-jackson.png`
const conditions = ['worse', 'better']

const highlights = [
    {
        title: '⚔️ Assassino Implacável',
        description: 'Mais eliminações.',
        attribute: 'kills',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🧳 Turista da Agency',
        description: 'Menos eliminações.',
        attribute: 'kills',
        condition: conditions[0],
        cover: defaultCover,
    },
    {
        title: '🛡️ Imortal',
        description: 'Menos mortes.',
        attribute: 'deaths',
        condition: conditions[0],
        cover: defaultCover,
    },
    {
        title: '⚰️ Ímã de Balas',
        description: 'Mais mortes.',
        attribute: 'deaths',
        condition: conditions[1],
        cover: `${ relativePath }/assets/covers/f-batista.jpg`,
    },
    {
        title: '🍞 Padeiro',
        description: 'Mais assistências.',
        attribute: 'assists',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '▶️ Iniciador de Combate',
        description: 'Mais primeiras eliminações nas rodadas.',
        attribute: 'firstKills',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🦸 Herói da Agency',
        description: 'Mais reféns resgatados.',
        attribute: 'objective',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🤯 Head Shot Machine',
        description: 'Mais headshots (HSs).',
        attribute: 'HSs',
        condition: conditions[1],
        cover: `${ relativePath }/assets/covers/hs-batista.gif`,
    },
    {
        title: '🤕 Precisão Mortal',
        description: 'Mais %headshots (HSs).',
        attribute: 'enemyHSs',
        condition: conditions[1],
        cover: `${ relativePath }/assets/covers/hs-batista.gif`,
    },
    {
        title: '⭐ Estrela da partida',
        description: 'Mais Destaques.',
        attribute: 'mvps',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '💣 Artilheiro Tático',
        description: 'Mais dano com utilitário (DU).',
        attribute: 'utilityDamage',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🎒 Conservador de Granadas',
        description: 'Menos dano com utilitário (DU).',
        attribute: 'utilityDamage',
        condition: conditions[0],
        cover: defaultCover,
    },
    {
        title: "💥 Can't you see me?",
        description: 'Mais inimigos cegos (IC).',
        attribute: 'enemiesFlashed',
        condition: conditions[1],
        cover: defaultCover,
    },
    // {
    //     title: 'Luz Suave',
    //     description: 'Menos inimigos cegos (IC).',
    //     attribute: 'enemiesFlashed',
    //     condition: conditions[0],
    //     cover: defaultCover,
    // },
    {
        title: '🎰 Máquina Mortífera',
        description: 'Melhor K/D (Relação Vítimas/Mortes).',
        attribute: 'kd',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🔨 Destruidor da Agency',
        description: 'Maior DMR (Dano Médio por Rodada).',
        attribute: 'dmr',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '⚒️ Demolidor',
        description: 'Maior dano total.',
        attribute: 'damage',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '👶 Inofensivo',
        description: 'Menor dano total.',
        attribute: 'damage',
        condition: conditions[0],
        cover: defaultCover,
    },
    {
        title: '⏳ Sobrevivente da Agency',
        description: 'Maior tempo vivo.',
        attribute: 'liveTime',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🔫 Pistoleiro',
        description: 'Mais eliminações com Pistola.',
        attribute: 'pistolKills',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🥷 Carrasco Silencioso',
        description: 'Mais eliminação com Faca.',
        attribute: 'knifeKills',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🎯 Sniper',
        description: 'Mais eliminações com Sniper.',
        attribute: 'SniperKills',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '👤 Gladiador Solo',
        description: 'Mais vitórias 1x1.',
        attribute: 'Wins1v1',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '👥 O Improvável',
        description: 'Mais vitórias 1x2.',
        attribute: 'Wins1v2',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '👪 Ameaça Tripla',
        description: 'Mais 3 eliminações na mesma rodada (3k).',
        attribute: 'enemy3Ks',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '👨‍👩‍👦‍👦 Aniquilador de Quadras',
        description: 'Mais 4 eliminações na mesma rodada (4k).',
        attribute: 'enemy4Ks',
        condition: conditions[1],
        cover: defaultCover,
    },
    {
        title: '🕶️ Exterminador Total',
        description: 'Mais 5 eliminações na mesma rodada (5k).',
        attribute: 'enemy5Ks',
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