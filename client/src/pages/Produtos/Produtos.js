import React from 'react'
import './Produtos.css'
import { useState } from 'react'
import Axios from 'axios'

function PagesProdutos() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState(0)
  const [newPreco, setNewPreco] = useState(0)
  const [produtoLista, setProdutoLista] = useState([])
  const [produtoDetalhes, setProdutoDetalhes] = useState([])

  /*   const displayInfo = () => {
      console.log(qtdproduto, total, tipopagamento)
    } */

  const addProduto = () => {
    Axios.post('http://localhost:3001/create', {
      nome: nome,
      descricao: descricao,
      preco: preco,
    })
      .then(() => {
        setProdutoLista([
          ...produtoLista,
          {
            nome: nome,
            preco: preco,
          },
        ])
      })
      .then(() => {
        setProdutoDetalhes([
          ...produtoDetalhes,
          {
            nome: nome,
            descricao: descricao,
            preco: preco,
          },
        ])
      })
  }

  const getProdutos = () => {
    Axios.get('http://localhost:3001/produtos').then((response) => {
      setProdutoLista(response.data)
      setProdutoDetalhes(response.data)
    })
  }

  const getProdutosDetalhes = () => {
    Axios.get('http://localhost:3001/produto_id').then((response) => {
      setProdutoDetalhes(response.data)
    })
  }

  const updateProduto = (id) => {
    Axios.put('http://localhost:3001/update', { preco: newPreco, id: id }).then(
      (response) => {
        setProdutoLista(
          produtoLista.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  nome: val.nome,
                  descricao: val.descricao,
                  preco: newPreco,
                }
              : val
          }),
        )
      },
    )
  }

  const deleteProduto = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProdutoLista(
        produtoLista.filter((val) => {
          return val.id != id
        }),
      )
    })
  }

  return (
    <fieldset>
      <div className="jumbotron">
        <div className="App">
          <h1>Desafio ICTS</h1>
          <h2>Produtos</h2>
          <div className="information">
            <label>Nome do produto:</label>
            <input
              type="text"
              placeholder="Exemplo: Playstation 4"
              onChange={(event) => {
                setNome(event.target.value)
              }}
            />
            <label>Descrição:</label>
            <input
              type="text"
              placeholder="Exemplo: Sony Playstation 4 Slim"
              onChange={(event) => {
                setDescricao(event.target.value)
              }}
            />
            <label>Preço:</label>
            <input
              type="number"
              placeholder="Exemplo: 4,000"
              onChange={(event) => {
                setPreco(event.target.value)
              }}
            />
            //<button onClick={addProduto}>Adicionar Produtos</button>
          </div>

          <div className="produtos-botao">
            <button onClick={getProdutos}>Mostrar todos os Produtos</button>

            {produtoLista.map((val, key) => {
              return (
                <div className="produtos">
                  <div>
                    <h3>Nome: {val.nome}</h3>
                    <h3>Preço: {val.preco}</h3>
                  </div>
                  <div>
                    <input
                      className="update"
                      type="text"
                      placeholder="Digite o novo preço do produto..."
                      onChange={(event) => {
                        setNewPreco(event.target.value)
                      }}
                    />
                    <button
                      onClick={() => {
                        updateProduto(val.id)
                      }}
                    >
                      {' '}
                      Atualizar Preço
                    </button>

                    <button
                      onClick={() => {
                        deleteProduto(val.id)
                      }}
                    >
                      Deletar Produto
                    </button>
                    <button onClick={getProdutosDetalhes}>
                      Mostrar detalhes
                    </button>
                    {produtoDetalhes.map((val) => {
                      return (
                        <div className="produtos">
                          <div>
                            <h3>Nome: {val.nome}</h3>
                            <h3>Descrição: {val.descricao}</h3>
                            <h3>Preço: {val.preco}</h3>
                            <h3>Data: {val.data_criacao}</h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default PagesProdutos
