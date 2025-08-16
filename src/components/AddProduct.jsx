import { useState } from "react";
import styles from "./AddProduct.module.css";

export default function AddProduct({ onAdd }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !preco) {
      alert("Preencha nome e preço do produto!");
      return;
    }
    onAdd?.({ nome, preco: parseFloat(preco), descricao });
    setNome("");
    setPreco("");
    setDescricao("");
  };

  return (
    <div className={styles.container}>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
