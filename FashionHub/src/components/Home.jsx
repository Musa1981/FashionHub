import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom

const Home = () => {
  return (
    <div className="container">
      <h1 className="display-1 font-weight-bold mb-4 text-center" style={{ color: 'gold' }}>Welcome to FASHIONHUB</h1>
      <h2 className="display-5 mb-4 text-center">Discover the latest fashion trends and shop your favorite styles online.</h2>
      <div className="d-flex justify-content-center">
        <Link to="/products" className="btn btn-primary mr-4">Shop Now</Link>
        <Link to="/login" className="btn btn-primary" style={{ marginLeft: '50px' }}>Login</Link>
      </div>
    </div>
  );
};

export default Home;
