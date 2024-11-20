const projectName = 'match-summary'

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
            calculate: function (value) { return value * 1 },
        },
        deaths: {
            data: 'Mortes',
            measure: '1',
            score: '-0,5',
            calculate: function (value) { return value * -0.5 },
        },
        assists: {
            data: 'Assistências',
            measure: '1',
            score: '0,5',
            calculate: function (value) { return value * 0.5 },
        },
        kd: {
            data: 'KD',
            measure: 'Total por Partida',
            score: 'x2',
            calculate: function (value) { return value * 2 },
        },
        objective: {
            data: 'Reféns entregues',
            measure: '1',
            score: '2',
            calculate: function (value) { return value * 2 },
        },
        mvps: {
            data: 'Destaques',
            measure: '1',
            score: '2',
            calculate: function (value) { return value * 2 },
        },
        damage: {
            data: 'Dano',
            measure: '100',
            score: '1',
            calculate: function (value) { return (value / 100) * 1 },
        },
        enemyHSs: {
            data: '% HS',
            measure: 'Total',
            score: '10%',
            calculate: function (value) { return value *  0.1 },
        },
        utilityDamage: {
            data: 'Dano com utilitárias ',
            measure: '10',
            score: '0,10',
            calculate: function (value) { return (value / 10) * 0.1 },
        },
        enemiesFlashed: {
            data: 'Inimigo cego',
            measure: '1',
            score: '0,10',
            calculate: function (value) { return value * 0.1 },
        },
        firstKs: {
            data: 'Primeira eliminação do round',
            measure: '1',
            score: '0,5',
            calculate: function (value) { return value * 0.5 },
        },
        Count1v1: {
            data: '1x1',
            measure: '1',
            score: '1',
            calculate: function (value) { return value * 1 },
        },
        Count1v2: {
            data: '1x2',
            measure: '1',
            score: '2',
            calculate: function (value) { return value * 1 },
        },
        enemy3Ks: {
            data: '3 Eliminações no round',
            measure: '1',
            score: '1',
            calculate: function (value) { return value * 1 },
        },
        enemy4Ks: {
            data: '4 Eliminações no round',
            measure: '1',
            score: '3',
            calculate: function (value) { return value * 3 },
        },
        enemy5Ks: {
            data: '5 Eliminações no round',
            measure: '1',
            score: '5',
            calculate: function (value) { return value * 5 },
        },
        killsKnife: {
            data: 'Eliminação com Faca',
            measure: '1',
            score: '5',
            calculate: function (value) { return value * 5 },
        },
        killsPistol: {
            data: 'Eliminações com Pistola',
            measure: '1',
            score: '0,5',
            calculate: function (value) { return value * 0.5 },
        },
        killsSniper: {
            data: 'Eliminações com Sniper',
            measure: '1',
            score: '0,25',
            calculate: function (value) { return value * 0.25 },
        },
        roundWithoutDying: {
            data: 'Rounds sem morrer',
            measure: '1',
            score: '1',
            calculate: function (value) { return value * 1 },
        },
        liveTime: {
            data: 'Tempo vivo',
            measure: '60s',
            score: '1',
            calculate: function (value) { return (value / 60) * 1 },
        },
    }
}
