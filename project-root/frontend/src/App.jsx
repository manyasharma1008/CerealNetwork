import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fridges, setFridges] = useState([]);
  const [location, setLocation] = useState('');
  const [items, setItems] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  const BASE_URL = "https://cerealnetwork-backend.onrender.com"; // 🔥 Your live backend

  // Fetch fridge data
  useEffect(() => {
    fetch(`${BASE_URL}/api/fridge/all`)
      .then(res => res.json())
      .then(data => {
        console.log('✅ Backend Connected. Fridge Data:', data);
        setFridges(data); // ✅ Show fridge data in UI
      })
      .catch(err => {
        console.error('❌ Backend NOT Connected:', err);
      });
  }, []);

  // Handle fridge insert
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      location,
      items: items.split(',').map(item => item.trim()),
      updatedBy
    };

    await fetch(`${BASE_URL}/api/fridge/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLocation('');
    setItems('');
    setUpdatedBy('');
    alert('Fridge added!');
  };

  return (
    <div className="app">
      <h1>🧊 Mycelium Fridge Network</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Items (comma separated)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Updated By"
          value={updatedBy}
          onChange={(e) => setUpdatedBy(e.target.value)}
          required
        />
        <button type="submit">Add Fridge</button>
      </form>

      <h2>📦 Fridge Inventory</h2>
      <ul>
        {fridges.map((fridge) => (
          <li key={fridge._id}>
            <strong>{fridge.location}</strong> — {fridge.items.join(', ')} (by {fridge.updatedBy})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;