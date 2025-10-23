import React from "react";
import TearTitle from "../components/TearTitle";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <TearTitle text="Welcome to The Cereal Network" />
        <p>Connecting communities through compassion and innovation.</p>
      </section>

      <section className="reviews">
        <h3>What People Say</h3>
        <div className="review-grid">
          <div className="card">“Amazing initiative!” – Riya</div>
          <div className="card">“Love the mission!” – Ayaan</div>
          <div className="card">“Keep going!” – Marcus</div>
        </div>
      </section>

      <section className="contact">
        <h3>Contact Us</h3>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}
