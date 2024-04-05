import React, { useState } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage('Fyll i både e-post och lösenord för att registrera.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/fashionhub/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Något gick fel vid registreringen');
      }
      console.log('Användare skapad');
      setMessage('Användare skapad');
    } catch (error) {
      console.error(error);
      setMessage('Något gick fel vid registreringen');
    }
  };

  return (
    <div className="container">
      <h2>Registrera ny användare</h2>
      <Form>
        <FormGroup>
          <FormLabel>E-post:</FormLabel>
          <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Lösenord:</FormLabel>
          <FormControl type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button variant="primary" onClick={handleRegister}>Registrera</Button>
      </Form>
      {message && <Alert variant="success">{message}</Alert>}
    </div>
  );
};

export default Register;
