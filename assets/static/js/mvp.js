$(document).ready(function () {
    function calculateMvpScoreByAttribute (attribute, value) {
        return mvpScores[mvpVersion][attribute] !== undefined ? formatTwoDecimalPlaces(mvpScores[mvpVersion][attribute].calculate(value)) : 0
    }

    $('#mvpVersion').text(`Versão ${ mvpVersion }`)

    const html = Object.entries(mvpScores[mvpVersion]).map(([key, mvp], index) => `
        <tr>
            <th scope="row">${ index + 1 }</th>
            <td>${ mvp.data }</td>
            <td class="text-center">${ mvp.measure }</td>
            <td class="text-center">${ mvp.score }</td>
        </tr>
    `).join('')

    $('#mvp-score tbody').html(html)

    window.calculateMvpScoreByAttribute = calculateMvpScoreByAttribute
})
