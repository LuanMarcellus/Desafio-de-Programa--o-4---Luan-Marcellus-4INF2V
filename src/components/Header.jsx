export function ProductList({ addToCart, removeFromCart, cart, showCart, setShowCart }) {
  // ... seu código existente de fetch de produtos

  if (showCart) {
    return (
      <div className="cart-view">
        <h2>Seu Carrinho</h2>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Preço: ${item.price}</p>
                  <div className="item-controls">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                  <p>Total: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total Geral: ${
                cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)
              }</h3>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ... seu código existente de exibição de produtos
}import styles from "./Header.module.css";

export function Header({ cart }) {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <header className={styles.header}>
      <h1>TRJ Megastore</h1>
      <div>
        {totalQty > 0 && <p>{totalQty} produtos</p>}
        <p>
          Total R$: {totalPrice.toFixed(2)}
        </p>
      </div>
    </header>
  );
  
}