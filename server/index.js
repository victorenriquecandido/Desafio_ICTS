const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'desafioICTS',
});

app.post('/create', (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;

    db.query('INSERT INTO produtos (nome, descricao, preco) VALUES (?,?,?)', 
    [nome, descricao, preco],
    (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send("Dados inseridos com sucesso!")
        }
    });
});

app.listen(3001, () =>{
    console.log("Seu servidor está rodando na porta 3001")
});
