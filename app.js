const express = require('express');
const app = express();

// Middleware para servir arquivos estáticos (HTML)
app.use(express.static('public'));

// Endpoint que exibe o conteúdo enviado pelo usuário
app.get('/search', (req, res) => {
    const query = req.query.q;
    
    // Resposta vulnerável a XSS
    res.send(`<h1>Resultados da busca para: ${query}</h1>`);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


//CORREÇÃO PARA XSS
//const express = require('express');
//const app = express();

//// Função para escapar caracteres especiais em HTML
//function escapeHtml(unsafe) {
//    return unsafe
//        .replace(/&/g, "&amp;")
//        .replace(/</g, "&lt;")
//        .replace(/>/g, "&gt;")
//        .replace(/"/g, "&quot;")
//        .replace(/'/g, "&#039;");
//}

//// Middleware para servir arquivos estáticos (HTML)
//app.use(express.static('public'));

//// Endpoint seguro contra XSS
//app.get('/search', (req, res) => {
//    const query = req.query.q;
//    const safeQuery = escapeHtml(query);

//    // Resposta segura com escape de HTML
//    res.send(`<h1>Resultados da busca para: ${safeQuery}</h1>`);
//});

//app.listen(3000, () => {
//    console.log('Servidor rodando na porta 3000');
//});
