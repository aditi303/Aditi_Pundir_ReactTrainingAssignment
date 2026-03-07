import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const tileStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    width: "150px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "30px",
  };

  return (
    <div>
      <h1>Home</h1>
      <div style={containerStyle}>
        <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={tileStyle}>Dashboard</div>
        </Link>
        <Link to="/stock1" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={tileStyle}>Stock 1</div>
        </Link>
        <Link to="/stock2" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={tileStyle}>Stock 2</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;