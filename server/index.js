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

app.post("/create", (req, res) => {
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

app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const preco = req.body.preco;
  db.query(
    "UPDATE produtos SET preco = ? WHERE id = ?",
    [preco, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM produtos WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});