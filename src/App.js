import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import api from "./services/api";
import "./App.css";

const socket = socketio("http://localhost:3333");
function App() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [showProduct, setShowProduct] = useState("");
  const [showWeight, setShowWeight] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/listproducts");
      setProducts(response.data);
    }

    loadProducts();

    socket.on("changeData", (data) => {
      setProducts([...products, data]);
    });
  }, [products]);

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post("/products", { weight, description });

    setWeight(0);
    setDescription("");
  }

  async function del() {
    const prod_id = id;

    await api.delete(`/products/${prod_id}`);

    setShow(false);
  }

  function onProductChange(e) {
    const product = products.find((p) => p._id == e.target.value);
    console.log(product);

    const { description, weight } = product;

    setShowProduct(description);
    setShowWeight(weight);
    setId(e.target.value);

    setShow(true);
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
        <select className="slt" onChange={onProductChange}>
          <option>Escolha um produto</option>
          {products.map((prod) => (
            <option key={prod._id} value={prod._id}>
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
        {showProduct !== "Escolha um produto" &&
          showProduct !== "" &&
          show === true && (
            <div className="show">
              <strong>{showProduct}</strong>
              <strong>{showWeight} kg</strong>
              <button className="btn" onClick={del}>
                Deletar
              </button>
            </div>
          )}
      </form>
    </div>
  );
}

export default App;
