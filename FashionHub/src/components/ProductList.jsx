import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';
import { FashionContext } from '../context/FashionContextProvider';

const ProductList = () => {
  const { addToCart } = useContext(FashionContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fashionhub/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="display-4 font-weight-bold mb-4 mx-auto text-center">FASHION PRODUCTS</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="card">
              <Link to={`/products/${product.id}`} className="d-block">
                <img
                  src={`/images/${product.image_path}`}
                  alt={product.name}
                  className="card-img-top img-fluid rounded-md product-image"
                />
              </Link>
              <div className="card-body">
                <h3 className="card-title font-weight-bold mb-2">{product.name}</h3>
                <p className="lead mb-2">{product.description}</p>
                <p className="text-dark font-weight-bold">{product.price}</p>
                <button onClick={() => addToCart(product)} className="btn btn-primary mt-2">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Cart removeFromCart={() => { }} />
    </div>
  );
};

export default ProductList;
