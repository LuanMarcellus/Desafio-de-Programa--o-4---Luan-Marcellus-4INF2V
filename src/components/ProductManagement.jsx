// components/ProductManagement.jsx

import React, { useState } from 'react';
import ProductForm from './ProductForm';

function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 250 },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null); // Limpa o estado de edição
  };

  const removeProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <div className="product-management-container">
      <h2>Gerenciamento de Produtos</h2>
      <ProductForm 
        onSubmit={editingProduct ? updateProduct : addProduct} 
        initialData={editingProduct} 
      />
      
      <div className="product-list">
        <h3>Lista de Produtos</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}
              <div>
                <button onClick={() => setEditingProduct(product)}>
                  Editar
                </button>
                <button onClick={() => removeProduct(product.id)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductManagement;