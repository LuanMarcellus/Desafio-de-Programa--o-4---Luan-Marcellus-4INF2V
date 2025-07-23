import styles from "./ShoppingCart.module.css";

export function ShoppingCart({ cart, removeFromCart, setShowCart }) {
  const total = cart.reduce((t, item) => t + item.price * item.qty, 0);
  const totalPix = total * 0.9;

  return (
    <div className={styles.cartPage}>
      <h2>Resumo do Pedido</h2>
      <div className={styles.cartContent}>
        <div className={styles.productsSection}>
          {cart.map((item) => (
            <div key={item.id} className={styles.productCard}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Preço: R$ {item.price.toFixed(2)}</p>
                <p>Quantidade: {item.qty}</p>
                <p>Subtotal: R$ {(item.qty * item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <h3>RESUMO</h3>
          <p>Valor dos Produtos: <strong>R$ {total.toFixed(2)}</strong></p>
          <p>Total à prazo: <strong>R$ {total.toFixed(2)}</strong></p>
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
