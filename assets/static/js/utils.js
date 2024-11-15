$(document).ready(function () {
    const projectName = 'match-summary'

    function formatLiveTime (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }

    function sortObjectByAttribute(obj, attribute, desc = true) {
        return Object.values(obj).sort((a, b) => {
            const valueA = a[attribute]
            const valueB = b[attribute]
            return desc ? valueB - valueA : valueA - valueB
        })
    }

    function transformToRelative() {
        const segments = window.location.pathname.substring(1).split('/').filter(segment => segment !== '')
        const index = segments.indexOf(projectName)

        if (index !== -1) {
            console.log($('a'), $('a[href]'))

            $('a[href]').each(function() {
                var currentHref = $(this).attr('href')

                console.log($(this), currentHref)

                var newHref = `/${ projectName }/${ currentHref }`

                $(this).attr('href', newHref)
            })

            return `/${ projectName }/`
        }

        return segments.length > 0 ? '../'.repeat(segments.length) : ''
    }

    const relativePath = transformToRelative()

    window.relativePath = relativePath
    window.formatLiveTime = formatLiveTime
    window.sortObjectByAttribute = sortObjectByAttribute
})

// function sortObjectByAttribute(obj, attribute, desc = true) {
//     return Object.fromEntries(
//       Object.entries(obj)
//         .sort(([, a], [, b]) => {
//           const valueA = a[attribute];
//           const valueB = b[attribute];
//           return desc ? valueB - valueA : valueA - valueB;
//         })
//     );
// }
