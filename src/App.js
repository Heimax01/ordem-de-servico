import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/listproducts");
      setProducts(response.data);
    }

    loadProducts();
  }, [count]);
  const [products, setProducts] = useState([]);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");
  const [productShow, setProductShow] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/products", { weight, description });

    console.log(response.data);

    setWeight(0);
    setDescription("");
    setCount(+1);
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Descrição *</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Peso(kg) *</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button className="btn" type="submit">
          Cadastrar
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <label>Consultar Produto</label>
        <select
          className="slt"
          onChange={(e) => setProductShow(e.target.value)}
        >
          <option>Escolha um produto</option>
          {products.map((prod) => (
            <option key={prod._id} value={[prod.description, prod.weight]}>
              {prod.description}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {productShow !== "Escolha um produto" && productShow !== "" && (
          <div>
            <strong>{productShow} kg</strong>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
