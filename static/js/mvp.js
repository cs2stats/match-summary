$(document).ready(function () {
    MVP_CONSTANT = [
        {
            data: 'Vítimas',
            measure: '1',
            score: '1',
        },
        {
            data: 'Mortes',
            measure: '1',
            score: '-0,5',
        },
        {
            data: 'KD',
            measure: 'Total',
            score: 'x2',
        },
        {
            data: 'Destaques',
            measure: '1',
            score: '2',
        },
        {
            data: 'Assistências',
            measure: '1',
            score: '0,5',
        },
        {
            data: 'Dano',
            measure: '100',
            score: '1',
        },
        {
            data: '% HS',
            measure: 'Total',
            score: '10%',
        },
        {
            data: 'Dano com utilitárias ',
            measure: '10',
            score: '0,10',
        },
        {
            data: 'Inimigo cego',
            measure: '1',
            score: '0,10',
        },
        {
            data: 'Primeira eliminação do round',
            measure: '1',
            score: '0,5',
        },
        {
            data: '1x1',
            measure: '1',
            score: '1',
        },
        {
            data: '2x1',
            measure: '1',
            score: '2',
        },
        {
            data: '3 Eliminações no round',
            measure: '1',
            score: '1',
        },
        {
            data: '4 Eliminações no round',
            measure: '1',
            score: '3',
        },
        {
            data: '5 Eliminações no round',
            measure: '1',
            score: '5',
        },
        {
            data: 'Eliminação com Faca',
            measure: '1',
            score: '5',
        },
        {
            data: 'Eliminações com Pistola',
            measure: '1',
            score: '0,5',
        },
        {
            data: 'Eliminações com Sniper',
            measure: '1',
            score: '0,25',
        },
        {
            data: 'Rounds sem morrer',
            measure: '1',
            score: '1',
        },
        {
            data: 'Tempo vivo',
            measure: '60s',
            score: '1',
        },
    ]

    MVP_CONSTANT.map((mvp, index) => {
        const html = MVP_CONSTANT.map((mvp, index) => `
            <tr>
                <th scope="row">${ index + 1 }</th>
                <td>${ mvp.data }</td>
                <td class="text-center">${ mvp.measure }</td>
                <td class="text-center">${ mvp.score }</td>
            </tr>
        `).join('')

        $('#mvp-score tbody').html(html)
    })
})
