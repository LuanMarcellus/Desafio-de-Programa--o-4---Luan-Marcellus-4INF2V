// components/ProductForm.jsx

import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, id: initialData?.id });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{initialData ? 'Atualizar Produto' : 'Adicionar Produto'}</h3>
      <div className="form-group">
        <label htmlFor="product-name">Nome:</label>
        <input
          type="text"
          id="product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="product-price">Preço:</label>
        <input
          type="number"
          id="product-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        {initialData ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
}

export default ProductForm;