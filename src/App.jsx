import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // Novo estado para controlar a exibição

  function addToCart(product) {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === product.id);
      if (found) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  return (
    <>
      <Header 
        cart={cart} 
        onCartClick={() => setShowCart(!showCart)} // Adiciona função para alternar a visualização
        showCart={showCart}
      />
      <ProductList 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
      />
    </>
  );
}