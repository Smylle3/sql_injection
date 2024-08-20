const mysql = require('mysql2');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SQLpassword1',
    database: 'testdb'
});

connection.connect();

// Endpoint vulnerável a SQL Injection
app.get('/user', (req, res) => {
    const userId = req.query.id;

	// Consulta vulnerável
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

//// Endpoint seguro com uso de parâmetros de consulta
//app.get('/user', (req, res) => {
//    const userId = req.query.id;

//    // Consulta segura com parâmetros de consulta
//    const query = `SELECT * FROM users WHERE id = ?`;
//    connection.query(query, [userId], (error, results) => {
//        if (error) throw error;
//        res.send(results);
//    });
//});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
