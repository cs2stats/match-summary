$(document).ready(function () {
    const highlightsElement = $('#highlights')

    function createHighlighElement(index, highlight) {
        return `
            <div
                id="highlight-${ highlight.condition }-${ highlight.attribute }"
                data-attribute="${ highlight.attribute }"
                data-condition="${ highlight.condition }"
                data-index="${ index }"
                class="col highlight blur"
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

    highlights.forEach((highlight, index) => {
        highlightsElement.append(createHighlighElement(index, highlight))
    })

    highlightsElement.on('click', 'button', (e) => {
        if (matches.matchSummary !== null) {
            const highlight = $(`#${ e.target.getAttribute('for') }`)

            const index = highlight.data('index')
            const attribute = highlight.data('attribute')
            const condition = highlight.data('condition')

            const player = matches.getPlayerByAttribute(attribute, condition == 'better')

            highlightsElement.find(`.highlight[data-index=${ index + 1 }]`).removeClass('blur')

            e.target.remove()

            if (player[attribute] > 0) {
                highlight.find('img').attr('src', playersData[player.id].avatar)
                highlight.find('.card-body').append(`
                    <p><b>Resultado</b>: ${ playersData[player.id].name } com ${
                        attribute === 'liveTime' ? formatLiveTime(player[attribute]) : player[attribute]
                    }.</p>
                `)
            } else {
                highlight.find('img').attr('src',  `${ relativePath }/assets/brand/cs2-sad.png`)
                highlight.find('.card-body').append(`
                    <p><b>Resultado</b>: ninguém.</p>
                `)
            }
        }
    })
})
