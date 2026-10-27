import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App"><h1>Cargando clientes...</h1></div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Listado de Clientes y ISBNs</h1>
        <div className="customer-list">
          {customers.map((customer, index) => (
            <div key={index} className="customer-item">
              <p><strong>Nombre:</strong> {customer.name}</p>
              <p><strong>ISBN:</strong> {customer.isbn}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
