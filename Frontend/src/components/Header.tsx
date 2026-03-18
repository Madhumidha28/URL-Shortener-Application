import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: "white",
        color: "#3498db",
        padding: "15px 40px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "normal",
          textAlign: "left",
        }}
      >
        Easy URL Shortener
      </h1>
    </header>
  );
};

export default Header;
