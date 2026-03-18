import React, { useState } from "react";

interface HeroSectionProps {
  onShorten: (url: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShorten }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onShorten(url);
      setUrl("");
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#3498db",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "500" }}>
        Simplify your URL
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          maxWidth: "700px",
          margin: "0 auto",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="url"
          placeholder="Enter your original URL eg. http://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            flex: "1 1 300px",
            padding: "15px 20px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            minWidth: "250px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flex: "0 0 auto",
          }}
        >
          Shorten URL
        </button>
      </form>

      <p style={{ marginTop: "20px", fontSize: "14px", opacity: 0.9 }}>
        All the Shared URL and their analytics are public...
      </p>
    </section>
  );
};

export default HeroSection;
