const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'desafioICTS',
})

app.post('/create', (req, res) => {
  const nome = req.body.nome
  const descricao = req.body.descricao
  const preco = req.body.preco

  db.query(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?,?,?)',
    [nome, descricao, preco],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Dados inseridos com sucesso!')
      }
    },
  )
})

app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/produto_id', (req, res) => {
  const id = req.body.id
  db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/update', (req, res) => {
  const id = req.body.id
  const preco = req.body.preco
  db.query(
    'UPDATE produtos SET preco = ? WHERE id = ?',
    [preco, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM produtos WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.post('/compra/create', (req, res) => {
  const qtdproduto = req.body.qtdproduto
  const total = req.body.total
  const tipopagamento = req.body.tipopagamento

  db.query(
    'INSERT INTO compras (qtd_produto, total, tipo_pagamento) VALUES (?,?,?)',
    [qtdproduto, total, tipopagamento],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Dados inseridos com sucesso!')
      }
    },
  )
})

app.get('/compra', (req, res) => {
  db.query('SELECT * FROM compras', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/update-compra', (req, res) => {
  const id = req.body.id
  const tipopagamento = req.body.tipopagamento
  db.query(
    'UPDATE compras SET tipo_pagamento = ? WHERE id = ?',
    [tipopagamento, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.delete('/compra/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM compras WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!')
})
