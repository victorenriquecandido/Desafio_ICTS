import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [newPreco, setNewPreco] = useState(0);
  const [produtoLista, setProdutoLista] = useState([]);

  const addProduto = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      descricao: descricao,
      preco: preco,
    }).then(() => {
      setProdutoLista([
        ...produtoLista,
        {
          nome: nome,
          descricao: descricao,
          preco: preco,
        },
      ]);
    });
  };

  const getProdutos = () => {
    Axios.get("http://localhost:3001/produtos").then((response) => {
      setProdutoLista(response.data);
    });
  };

  const updateProduto = (id) => {
    Axios.put("http://localhost:3001/update", { preco: newPreco, id: id }).then(
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
              : val;
          })
        );
      }
    );
  };

  const deleteProduto = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProdutoLista(
        produtoLista.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <h1>Desafio ICTS</h1>
      <div className="information">
        <label>Nome do produto:</label>
        <input
          type="text" placeholder="Exemplo: Playstation 4"
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
        <label>Descrição:</label>
        <input
          type="text" placeholder="Exemplo: Sony Playstation 4 Slim"
          onChange={(event) => {
            setDescricao(event.target.value);
          }}
        />
        <label>Preço:</label>
        <input
          type="number" placeholder="Exemplo: 4,000"
          onChange={(event) => {
            setPreco(event.target.value);
          }}
        />
        <button onClick={addProduto}>Adicionar Produtos</button>
      </div>
      <div className="produtos">
        <button onClick={getProdutos}>Mostrar Produtos</button>

        {produtoLista.map((val, key) => {
          return (
            <div className="produtos">
              <div>
                <h3>Nome: {val.nome}</h3>
                <h3>Descrição: {val.descricao}</h3>
                <h3>Preço: {val.preco}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Digite o novo preço do produto..."
                  onChange={(event) => {
                    setNewPreco(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateProduto(val.id);
                  }}
                >
                  {" "}
                  Atualizar Preço
                </button>

                <button
                  onClick={() => {
                    deleteProduto(val.id);
                  }}
                >
                  Deletar Produto
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;