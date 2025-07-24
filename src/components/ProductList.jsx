
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
const [seguroSelecionado, setSeguroSelecionado] = useState(false); // <--- ADICIONE ESTA LINHA
  const valorDoSeguro = 2000; // <--- ADICIONE ESTA LINHA (Você pode mudar o valor aqui)
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
  let total = cart.reduce((total, item) => total + item.price * item.qty, 0); // <--- MANTENHA ESTA LINHA COM 'let'
  
  if (seguroSelecionado) {
    total += valorDoSeguro; 
  }
  const totalPix = total * 0.9;

  return (
    <div className={styles.cartPage}>
      <h2>Resumo do Pedido</h2>

      <div className={styles.cartContent}>
        <div className={styles.productsSection}>
          <button onClick={() => setShowCart(false)} className={styles.backBtn}>
            Voltar para produtos
          </button>

          {cart.length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h3>{item.title}</h3>
                  <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                  <div className={styles.cartItemQty}>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                  <p>Subtotal: R$ {(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.summarySection}>
          <h3>RESUMO</h3>
          <p>Valor dos Produtos: <strong>R$ {total.toFixed(2)}</strong></p>
          <p>Total à prazo: <strong>R$ {total.toFixed(2)}</strong></p>
          
          <div className={styles.insuranceOption}>
            <input
              type="checkbox"
              id="seguro"
              checked={seguroSelecionado}
              onChange={() => setSeguroSelecionado(!seguroSelecionado)}
            />
            <label htmlFor="seguro">12 Meses de Garantia (Seguro) (R$ {valorDoSeguro.toFixed(2)})</label>
          </div>
         

          <p className={styles.pix}>
            Valor à vista no PIX: <strong>R$ {totalPix.toFixed(2)}</strong><br />
            (Economize: R$ {(total - totalPix).toFixed(2)})
          </p>
          <button className={styles.continueBtn}>CONTINUAR</button>
          <button onClick={() => setShowCart(false)} className={styles.backBtn}>VOLTAR</button>
        </div>
      </div>
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
