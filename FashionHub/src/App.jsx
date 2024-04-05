import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Order from './components/Order';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {


  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-container">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/cart">Cart</NavLink></li>
            <li><NavLink to="/order">Order</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>

        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


