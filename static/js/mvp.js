$(document).ready(function () {
    MPV_CONSTANT = [
        {
            data: 'Vítimas',
            measure: '1',
            score: '1',
        },
        {
            data: 'Mortes',
            measure: '1',
            score: '-0,10',
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
            data: '10 Dano com utilitário',
            measure: '10',
            score: '0,10',
        },
        {
            data: 'Inimigo cego',
            measure: '1',
            score: '0,10',
        },
        {
            data: '2x1',
            measure: '-',
            score: '2',
        },
        {
            data: '1x1',
            measure: '-',
            score: '1',
        },
        {
            data: '3 Eliminações no round',
            measure: '-',
            score: '1',
        },
        {
            data: '4 Eliminações no round',
            measure: '-',
            score: '3',
        },
        {
            data: '5 Eliminações no round',
            measure: '-',
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
            data: 'Primeira eliminação da partida',
            measure: '1',
            score: '2',
        },
        {
            data: 'Última eliminação da partida',
            measure: '1',
            score: '2',
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

    MPV_CONSTANT.map((mvp, index) => {
        const html = MPV_CONSTANT.map((mvp, index) => `
            <tr>
                <th scope="row">${ index + 1 }</th>
                <td>${ mvp.data }</td>
                <td class="text-center">${ mvp.measure }</td>
                <td class="text-center">${ mvp.score }</td>
            </tr>
        `).join('')

        console.log(html)

        $('#mvp-score tbody').html(html)
    })
})
