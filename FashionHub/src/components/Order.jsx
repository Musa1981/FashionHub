import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FashionContext } from '../context/FashionContextProvider';
import axios from 'axios';

const Order = () => {
  const { cartItems, calculateTotalPrice } = useContext(FashionContext);

  // På klientens sida när du skapar en order
  const handleCheckout = async () => {
    try {
      const totalPrice = calculateTotalPrice();
      const userId = getUserId(); // Funktion för att hämta användarens ID från autentiseringsuppgifterna
      const response = await axios.post('http://localhost:3000/fashionhub/orders', {
        customer_id: userId,
        total_price: totalPrice
      });
      console.log(response.data); // Om svaret är 'Order tillagd' betyder det att order har lagts till framgångsrikt
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };



  return (
    <div className="order-container">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-primary">Shop now</Link></p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom py-4">
              <div>
                <img style={{ width: '10vw' }} src={'/images/' + item.image_path} alt={item.name} className="w-16 h-16 mr-4" />
              </div>
              <div>
                <span className="mr-4">{item.quantity} x ${item.price}</span>
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-between border-top py-4">
            <span className="font-weight-bold">Total:</span>
            <span>${calculateTotalPrice()}</span>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
