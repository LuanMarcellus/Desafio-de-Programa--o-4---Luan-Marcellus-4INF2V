import styles from "./Product.module.css";
import { useState, useEffect } from "react";

export function Product({ product, addToCart, removeFromCart, cart }) {
  const cartItem = cart.find((item) => item.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productQty}>
        <p className={styles.productPrice}>${product.price}</p>
        {qty > 0 && (
          <div className={styles.productQty}>
            <button onClick={() => removeFromCart(product.id)}>-</button>
            <p>{qty}</p>
            <button onClick={() => addToCart(product)}>+</button>
          </div>
        )}
      </div>
      <button
        className={styles.productButton}
        onClick={() => addToCart(product)}
      >
        {qty > 0 ? "ADICIONAR MAIS" : "ADICIONAR AO CARRINHO"}
      </button>
    </div>
  );
}