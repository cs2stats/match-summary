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

function transformToRelative(path) {
    // Conta o número de segmentos (divididos por '/'), ignorando a última barra vazia
    const segments = window.location.pathname.substring(1).split('/').filter(segment => segment !== '')
    
    // Gera '../' para cada segmento
    return '../'.repeat(segments.length)
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
