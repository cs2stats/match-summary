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

    console.log(index)

    if (index !== -1) {
        segments.splice(index, 1)

        return segments.length > 0 ? `/${ projectName }/${ '../'.repeat(segments.length) }` : `/${ projectName }/`
    }

    return segments.length > 0 ? '../'.repeat(segments.length) : ''
}

const relativePath = transformToRelative()

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
