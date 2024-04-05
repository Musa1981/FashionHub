import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FashionContext } from '../context/FashionContextProvider';

const ProductDetail = () => {
  const location = useLocation();
  const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(FashionContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fashionhub/product/${id}`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowMessage(true); // Visa meddelandet när produkten läggs till i varukorgen
      setTimeout(() => setShowMessage(false), 3000); // Dölj meddelandet efter 3 sekunder
    }
  };

  return (
    <div className="container product-detail-container">
      {product && (
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <img src={'/images/' + product.image_path} alt={product.name} className="mb-4 product-img rounded" />
          <p className="text-muted mb-4">{product.description}</p>
          <p className="text-dark font-weight-bold mb-4">{product.price}</p>
          <button onClick={handleAddToCart} className="btn btn-primary mt-4">
            Add to Cart
          </button>
          {showMessage && (
            <p className="text-success mt-3">Product added to cart!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
