import './App.css';
import {useState} from "react";

function App() {

  const [name, setName] = useState("react");
  const [descricao, setDescricao] = useState("react");
  const [preco, setPreco] = useState(0);

  const displayInfo = () =>{
    console.log(name, descricao, preco);
  };

  return (
    <div className="App">
      <div className="information">
    <label>Nome:</label>
    <input type="text" onChange={(event) => {
      setName(event.target.value);
    }} ></input>
      <label>Descrição:</label>
      <input type="text" onChange={(event) => {
      setDescricao(event.target.value);
    }} ></input>
      <label>Preço:</label>
      <input type="text" onChange={(event) => {
      setPreco(event.target.value);
    }} ></input>
      <button onClick={displayInfo}>Adicionar produto</button>
    </div>
    </div>
  );
}

export default App;
