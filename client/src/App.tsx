import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { name: "prod1", price: 100.00 },
    { name: "prod2", price: 200.00 },
    { name: "prod3", price: 300.00 },
  ]);

  function addProduct() {
    setProducts(prevState => [...prevState,
    { name: 'prod' + (prevState.length + 1), price: (prevState.length * 100) + 100 }]);
  }

  return (
    <div>
      <h1>hello</h1>
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;