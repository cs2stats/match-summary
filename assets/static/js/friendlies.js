$(document).ready(function () {
    const friendlies = [
        {
            'name': 'Amigável',
            'date': '27/10/2024 22:00',
            'team1': 'Time 1',
            'team2': 'Time A',
            'mvp': 'arthur',
            'lvp': 'RkHunter',
            'result': '1:1',
        },
        {
            'name': 'Vingança',
            'date': '27/11/2024 22:00',
            'team1': 'Time 1',
            'team2': 'Time A',
            'mvp': '??',
            'lvp': '??',
            'result': '??',
        },
    ]

    function createFriendlyLine(position, friendly) {
        return `<tr>
            <th scope="row">${ position }</th>
            <td><a href='/friendlies/${ position }'>${ friendly.name } <i class="bi bi-box-arrow-up-right"></i></a></td>
            <td>${ friendly.date }</td>
            <td>${ friendly.team1 }</td>
            <td>${ friendly.team2 }</td>
            <td>${ friendly.result }</td>
            <td>${ friendly.mvp }</td>
            <td>${ friendly.lvp }</td>
        </tr>`
    }

    friendlies.forEach((friendly, index) => {
        const position = index + 1

        $('table tbody').append(createFriendlyLine(position, friendly))
    })
})
