import React from "react";

export default function MockPaymentModal({ open, onClose, onSuccess }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, minWidth: 320, textAlign: "center" }}>
        <h2>Mock Payment</h2>
        <p>Click below to simulate a successful payment.</p>
        <button className="btn btn-primary" style={{ margin: "16px 0" }} onClick={onSuccess}>Pay Now</button>
        <br />
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
