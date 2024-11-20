$(document).ready(function () {
    const projectName = 'match-summary'

    function formatLiveTime (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }

    function formatTwoDecimalPlaces (num) {
        return +(Math.round(num + "e+2")  + "e-2")
    }

    function formatDecimal (num) {
        return num.toString().replace('.', ',')
    }

    function sortObjectByAttribute(obj, attribute, desc = true) {
        return Object.values(obj).sort((a, b) => {
            const valueA = a[attribute]
            const valueB = b[attribute]
            return desc ? valueB - valueA : valueA - valueB
        })
    }

    function transformToRelativePath () {
        $('a[href]').each(function() {
            var currentHref = $(this).attr('href')

            var newHref = `${ relativePath }/${ currentHref !== '/' ? currentHref : '' }`

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

    window.relativePath = relativePath
    window.formatLiveTime = formatLiveTime
    window.formatDecimal = formatDecimal
    window.formatTwoDecimalPlaces = formatTwoDecimalPlaces
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
