import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";

export function ProductList({ addToCart, removeFromCart, cart, showCart, setShowCart }) {
  var category = "beauty";
  var limit = 12;
  var apiUrl = `https://dummyjson.com/products/category/motorcycle`;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    setTimeout(() => {
      fetchProducts();
    }, 2000);
  }, []);

  if (showCart) {
    return (
      <div className={styles.cartContainer}>
        <h2>Seu Carrinho</h2>
        <button onClick={() => setShowCart(false)} className={styles.backButton}>
          Voltar para produtos
        </button>
        
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h3>{item.title}</h3>
                  <p>Preço unitário: ${item.price}</p>
                  <div className={styles.cartItemQty}>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                  <p>Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className={styles.cartTotal}>
              <h3>Total: ${cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Produtos</h1>
        <button onClick={() => setShowCart(true)} className={styles.cartButton}>
          Carrinho ({cart.reduce((total, item) => total + item.qty, 0)})
        </button>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        ))}
      </div>
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
              color: "#001111",
            }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}