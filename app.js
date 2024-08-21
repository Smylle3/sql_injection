//const express = require('express');
//const bodyParser = require('body-parser');
//const app = express();

//// Configura o body-parser para lidar com formulários
//app.use(bodyParser.urlencoded({ extended: true }));

//// Middleware para servir arquivos estáticos
//app.use(express.static('public'));

//// Simulação de banco de dados em memória
//let userBalance = 1000;

//// Endpoint que simula a transferência de fundos
//app.post('/transfer', (req, res) => {
//    const amount = parseFloat(req.body.amount);
    
//    // Reduz o saldo do usuário (sem validação de CSRF)
//    userBalance -= amount;
//    res.send(`Transferência de R$${amount.toFixed(2)} realizada com sucesso! Saldo atual: R$${userBalance.toFixed(2)}`);
//});

//app.listen(3000, () => {
//    console.log('Servidor rodando na porta 3000');
//});


//CÓDIGO DE CORREÇÃO
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

// Configura o body-parser e cookie-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Configura o middleware CSRF
const csrfProtection = csrf({ cookie: true });

// Simulação de banco de dados em memória
let userBalance = 1000;

// Endpoint que serve o formulário com o token CSRF
app.get('/transfer', csrfProtection, (req, res) => {
    res.send(`
        <h1>Realizar Transferência</h1>
        <form action="/transfer" method="POST">
            <input type="number" name="amount" placeholder="Digite o valor" required>
            <input type="hidden" name="_csrf" value="${req.csrfToken()}">
            <button type="submit">Transferir</button>
        </form>
    `);
});

// Endpoint protegido contra CSRF
app.post('/transfer', csrfProtection, (req, res) => {
    const amount = req.body.amount;
    
    // Reduz o saldo do usuário (agora protegido contra CSRF)
    userBalance -= amount;
    res.send(`Transferência de R$${amount} realizada com sucesso! Saldo atual: R$${userBalance}`);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
