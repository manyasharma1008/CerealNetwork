import React, { useState } from "react";
import "../styles/Donate.css";

export default function DonateForm() {
  console.log("💖 DonateForm page loaded");

  const [formData, setFormData] = useState({
    foodItem: "",
    quantity: "",
    donator: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you, ${formData.donator}! 🎉\nYour donation of ${formData.quantity} ${formData.foodItem}(s) has been recorded.`
    );
    setFormData({ foodItem: "", quantity: "", donator: "" });
  };

  return (
    <div className="donate-page">
      <h1 className="donate-title">Make a Donation ❤️</h1>
      <p className="donate-subtitle">
        Help us keep the fridges stocked and communities nourished.
      </p>

      <form className="donate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>🍱 Food Item</label>
          <input
            type="text"
            name="foodItem"
            value={formData.foodItem}
            onChange={handleChange}
            placeholder="e.g., Rice, Vegetables, Milk..."
            required
          />
        </div>

        <div className="form-group">
          <label>⚖️ Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 2 kg, 5 packets..."
            required
          />
        </div>

        <div className="form-group">
          <label>👤 Donator Name</label>
          <input
            type="text"
            name="donator"
            value={formData.donator}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <button type="submit" className="donate-btn">
          💖 Donate Now
        </button>
      </form>
    </div>
  );
}
