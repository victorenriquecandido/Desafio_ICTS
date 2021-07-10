import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [nome, setNome] = useState("react");
  const [descricao, setDescricao] = useState("react");
  const [preco, setPreco] = useState(0);

  const addProduto = () => {
    Axios.post("http://localhost:3001/create", {
      nome: nome,
      descricao: descricao,
      preco: preco,
    }).then(() => {
      console.log("sucesso");
    });
  };

  return (
    <div className="App">
      <div className="information">
    <label>Nome:</label>
    <input type="text" onChange={(event) => {
      setNome(event.target.value);
    }} ></input>
      <label>Descrição:</label>
      <input type="text" onChange={(event) => {
      setDescricao(event.target.value);
    }} ></input>
      <label>Preço:</label>
      <input type="text" onChange={(event) => {
      setPreco(event.target.value);
    }} ></input>
      <button onClick={addProduto}>Adicionar produto</button>
    </div>
    </div>
  );
}

export default App;
