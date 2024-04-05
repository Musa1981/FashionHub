import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FashionContext } from '../context/FashionContextProvider';

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotalPrice } = useContext(FashionContext);

  return (
    <div className="container" style={{ border: '1px solid red', backgroundColor: "grey" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <Link to="/order" className="btn btn-primary">Proceed to Checkout</Link>
      </div>
      {cartItems && cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-primary">Shop now</Link></p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom py-4">
              <div>
                <img style={{ width: '5vw' }} src={'/images/' + item.image_path} alt={item.name} className="w-16 h-16 mr-4" />
                <span>{item.name}</span>
              </div>
              <div>
                <span className="mr-4">{item.quantity} x ${item.price}</span>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-between border-top py-4">
            <span className="font-weight-bold">Total:</span>
            <span>${calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
