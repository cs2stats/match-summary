$(document).ready(function () {
    function calculateMvpScoreByAttribute (attribute, value) {
        return mvpScores[mvpVersion][attribute] !== undefined ? formatTwoDecimalPlaces(mvpScores[mvpVersion][attribute].calculate(value)) : 0
    }

    const mvpAwards = {
        '1.0': [
            {
                name: 'MVP',
                description: 'Rodízio na Suprema'
            },
        ],
        '2.0': [
            {
                name: 'MVP',
                description: 'Rodízio na Suprema + Coca (600ml)'
            },
            {
                name: 'LVP',
                description: 'Uma Skin'
            },
        ],
    }

    $('#mvpVersion').text(`Versão ${ mvpVersion }`)

    const html = Object.entries(mvpScores[mvpVersion]).map(([key, mvp], index) => `
        <tr>
            <td scope="row">${ index + 1 }</td>
            <td>${ mvp.data }</td>
            <td class="text-center">${ mvp.measure }</td>
            <td class="text-center">${ mvp.score }</td>
        </tr>
    `).join('')

    $('#mvp-score table tbody').html(html)

    mvpAwards[mvpVersion].forEach(award => {
        $('#podium-awards').append(`
            <button
                for="highlight-better-kills"
                class="btn btn-sm btn-outline-dark award animate__animated animate__tada"
                data-bs-toggle="modal"
                data-bs-target="#modal-award"
                data-src="${ relativePath }/assets/awards/${ mvpVersion }/${ award.name }.png",
                data-description="${ award.description }"
            >
                🎁 ${ award.name }
            </button>
        `)
    })

    window.calculateMvpScoreByAttribute = calculateMvpScoreByAttribute
})
