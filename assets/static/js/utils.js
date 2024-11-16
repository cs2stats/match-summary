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

    function transformToRelativePath () {
        console.log('transformToRelativePath')

        $('a[href]').each(function() {
            var currentHref = $(this).attr('href')

            console.log('a', $(this), relativePath, currentHref)

            var newHref = `${ relativePath }${ currentHref }`

            console.log(newHref)

            $(this).attr('href', newHref)
        })
}

    function getRelativePath() {
        const segments = window.location.pathname.substring(1).split('/').filter(segment => segment !== '')
        const index = segments.indexOf(projectName)

        return index !== -1 ? `/${ projectName }` : ''
    }

    const relativePath = getRelativePath()

    transformToRelativePath()

    console.log(1, relativePath)

    window.relativePath = relativePath
    window.formatLiveTime = formatLiveTime
    window.sortObjectByAttribute = sortObjectByAttribute
    window.transformToRelativePath = transformToRelativePath
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
