$(document).ready(function () {
    const majors = []

    const friendlies = [
        {
            'name': 'Amigável',
            'date': '27/10/2024 22:00',
            'team1': 'Time 1',
            'team2': 'Time A',
            'mvp': 328904852,
            'lvp': 186585363,
            'result': '1:1',
        },
        {
            'name': 'Vingança',
            'date': '??/??/???? 20:00',
            'team1': 'Time 1',
            'team2': 'Time A',
            'mvp': '??',
            'lvp': '??',
            'result': '??',
        },
    ]

    const trainings = [
        {
            'name': 'Treino que o Arthur caiu',
            'date': '28/11/2024 22:00',
            'team1': 'Time 1',
            'team2': 'Time A',
            'mvp': 397076720,
            'lvp': 276912860,
            'result': '0:1',
        },
    ]

    function createPlayerLink(playerId) {
        if (playerId !== '??') {
            return `
                <td>
                    <a href="${ relativePath }/player/${ playerId }">${ playersData[playerId].name }
                        <i class="bi bi-box-arrow-up-right"></i>
                    </a>
                </td>
            `
        } else {
            return `<td>${ playerId }</td>`
        }
    }

    function createMatchLine(matchType, position, match) {
        return `<tr>
            <th scope="row">${ position }</th>
            <td><a href="${ relativePath }/matches/${ matchType }/${ position }">${ match.name } <i class="bi bi-box-arrow-up-right"></i></a></td>
            <td>${ match.date }</td>
            <td>${ match.team1 }</td>
            <td>${ match.team2 }</td>
            <td>${ match.result }</td>
            ${ createPlayerLink(match.mvp) }
            ${ createPlayerLink(match.lvp) }
        </tr>`
    }

    function createMatches(matchType, data) {
        data.forEach((match, index) => {
            const position = index + 1
    
            $(`table#${ matchType } tbody`).append(createMatchLine(matchType, position, match))
        })

        if (data.length > 0) {
            $(`table#${ matchType }`).show()
        }
    }

    createMatches('major', majors)
    createMatches('friendly', friendlies)
    createMatches('training', trainings)
})
