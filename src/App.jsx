import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

import "./App.css";

function App() {
  // resgatando dados
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      // será aguardado a url
      const res = await fetch(url);

      // resposta gerada da requisição fetch
      const data = await res.json();

      setProducts(data);
    }

    getData();
  }, []);

  // Envio de dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })

  }

  return (
    <div className="App">
      <h2>HTTP em React</h2>
      {/* resgate de dados */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price}
          </li>
        ))}
      </ul>

      {/* Enviando dados */}
      <div className="add-product">
        <form onChange={handleSubmit} >  
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <span>Preço</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default App;
