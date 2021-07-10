import './App.css'
import { useState } from 'react'
import Axios from 'axios'
import Modal from './Component/Modal/Modal'

function App() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState(0)
  const [newPreco, setNewPreco] = useState(0)
  const [produtoLista, setProdutoLista] = useState([])
  const [produtoDetalhes, setProdutoDetalhes] = useState([])

  const [newCompra, setNewCompra] = useState(0)
  const [qtdproduto, setQtdProduto] = useState('')
  const [total, setTotal] = useState(0)
  const [tipopagamento, setTipoPagamento] = useState('')
  const [compraLista, setCompraLista] = useState([])

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

  //////////////////////////////////////////////////////////////////////////

  const addCompra = () => {
    Axios.post('http://localhost:3001/compra/create', {
      qtdproduto: setQtdProduto,
      total: setTotal,
      tipopagamento: setTipoPagamento,
    }).then(() => {
      setCompraLista([
        ...compraLista,
        {
          qtdproduto: setQtdProduto,
          total: setTotal,
          tipopagamento: setTipoPagamento,
        },
      ])
    })
  }

  const getCompras = () => {
    Axios.get('http://localhost:3001/compra').then((response) => {
      setCompraLista(response.data)
    })
  }

  const updateCompra = (id) => {
    Axios.put('http://localhost:3001/compra/update', {
      preco: newPreco,
      id: id,
    }).then((response) => {
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
    })
  }

  const deleteCompra = (id) => {
    Axios.delete(`http://localhost:3001/compra/delete/${id}`).then(
      (response) => {
        setCompraLista(
          compraLista.filter((val) => {
            return val.id != id
          }),
        )
      },
    )
  }

  function ProductTable(props) {
    const { products } = props
    return (
      <table>
        <caption>Our products</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
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
            <button onClick={addProduto}>Adicionar Produtos</button>
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

      <div className="jumbotron">
        <div className="App">
          <h1>Desafio ICTS</h1>
          <h2>Compras</h2>
          <div className="information">
            <label>Quantidade do produto:</label>
            <input
              type="text"
              placeholder="Exemplo: 1"
              onChange={(event) => {
                setQtdProduto(event.target.value)
              }}
            />
            <label>Total:</label>
            <input
              type="number"
              placeholder="Exemplo: 5.000"
              onChange={(event) => {
                setTotal(event.target.value)
              }}
            />
            <label>Tipo de pagamento:</label>
            <input
              type="text"
              placeholder="Exemplo: Dinheiro"
              onChange={(event) => {
                setTipoPagamento(event.target.value)
              }}
            />
            <button onClick={addCompra}>Adicionar Compra</button>
          </div>
          <div className="compras-botao">
            <button onClick={getCompras}>Mostrar Compras</button>

            {compraLista.map((val, key) => {
              return (
                <div className="compras">
                  <div>
                    <h3>Quantidade do produto: {val.qtdproduto}</h3>
                    <h3>Total: {val.total}</h3>
                    <h3>Tipo de pagamento: {val.tipopagamento}</h3>
                  </div>
                  <div>
                    <input
                      className="1"
                      type="text"
                      placeholder="Digite o novo preço do produto..."
                      onChange={(event) => {
                        setNewCompra(event.target.value)
                      }}
                    />
                    <button
                      onClick={() => {
                        updateCompra(val.id)
                      }}
                    >
                      {' '}
                      Atualizar Preço
                    </button>

                    <button
                      onClick={() => {
                        deleteCompra(val.id)
                      }}
                    >
                      Deletar Produto
                    </button>
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

export default App
