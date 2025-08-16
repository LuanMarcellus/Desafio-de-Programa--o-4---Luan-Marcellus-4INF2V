import { useState } from "react";
import styles from "./EditProduct.module.css";

export default function EditProduct({ produto, onUpdate }) {
  const [nome, setNome] = useState(produto?.nome || "");
  const [preco, setPreco] = useState(produto?.preco || "");
  const [descricao, setDescricao] = useState(produto?.descricao || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !preco) {
      alert("Preencha nome e preço do produto!");
      return;
    }
    onUpdate?.({ ...produto, nome, preco: parseFloat(preco), descricao });
  };

  return (
    <div className={styles.container}>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
