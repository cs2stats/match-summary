document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    if (file) {
        const reader = new FileReader();

        // Função que será chamada quando o arquivo for carregado
        reader.onload = function(e) {
            const fileContent = e.target.result; // Conteúdo do arquivo

            // Exibe o conteúdo do arquivo na página
            document.getElementById('output').textContent = fileContent;

            // Aqui você pode processar o conteúdo conforme necessário
            processFileContent(fileContent);
        };

        // Lê o arquivo como texto
        reader.readAsText(file);
    }
});

function processFileContent(content) {
    // Aqui você pode implementar a lógica para processar o conteúdo do arquivo.
    // Por exemplo, pode-se tentar converter para JSON ou simplesmente analisar os dados.

    try {
        // Se o conteúdo for um formato JSON ou similar, podemos tentar convertê-lo.
        const parsedContent = JSON.parse(content);
        console.log(parsedContent);
    } catch (error) {
        console.log('Erro ao tentar parsear o conteúdo do arquivo:', error);
    }
}
