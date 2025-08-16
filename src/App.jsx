// App.jsx

import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react";

// Importando os novos componentes
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ProductManagement from "./components/ProductManagement";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [screen, setScreen] = useState('login'); // Novo estado para controlar a tela

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

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'productManagement':
        return <ProductManagement />;
      case 'productList':
        return (
          <ProductList
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            showCart={showCart}
            setShowCart={setShowCart}
          />
        );
      default:
        return <LoginScreen />;
    }
  };

  return (
    <>
      <Header
        cart={cart}
        onCartClick={() => setShowCart(!showCart)}
        showCart={showCart}
      />
      <nav>
        <button onClick={() => setScreen('login')}>Login</button>
        <button onClick={() => setScreen('register')}>Cadastro</button>
        <button onClick={() => setScreen('productList')}>Produtos (Loja)</button>
        <button onClick={() => setScreen('productManagement')}>Gerenciar Produtos</button>
      </nav>
      {renderScreen()}
    </>
  );
}