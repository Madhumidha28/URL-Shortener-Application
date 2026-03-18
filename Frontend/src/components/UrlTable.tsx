import React from "react";
import { Url } from "../types/UrlTypes";

interface UrlTableProps {
  urls: Url[];
  loading: boolean;
  onAnalytics: (id: number) => void;
}

const UrlTable: React.FC<UrlTableProps> = ({ urls, loading, onAnalytics }) => {
  const formatDateWithSuffix = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const month = date.toLocaleDateString("en-US", {
      month: "long",
    });

    return `${weekday} ${day}${suffix} ${month}`;
  };

  const handleCopy = (shortCode: string, type: "short" | "analytics") => {
    if (type === "short") {
      const shortUrl = `http://localhost:8081/${shortCode}`;
      navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    } else {
      navigator.clipboard.writeText(`Analytics for ${shortCode}`);
      alert("Analytics copied!");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading URLs...
      </div>
    );
  }

  const cellStyle = {
    padding: "12px 15px",
    border: "1px solid #dee2e6",
  };

  const ellipsisStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    maxWidth: "250px",
  };

  const greenBtn = {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const blueBtn = {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "8px",
        overflow: "auto",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "800px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th style={{ padding: "15px", textAlign: "left" }}>Original URL</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Short URL</th>
            <th></th>
            <th></th>
            <th style={{ padding: "15px", textAlign: "left" }}>Created on</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Clicks</th>
            <th style={{ padding: "15px", textAlign: "left" }}></th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => (
            <tr key={url.id} style={{ borderBottom: "1px solid #dee2e6" }}>
              <td style={cellStyle}>
                <div style={ellipsisStyle} title={url.originalUrl}>
                  {url.originalUrl}
                </div>
              </td>

              <td style={cellStyle}>
                <a
                  href={`http://localhost:8081/api/urls/code/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3498db", textDecoration: "none" }}
                >
                  <img src="/images/copy.png" height={15} width={15}></img>
                  {`http://localhost:8081/${url.shortCode}`}
                </a>
              </td>

              <td style={cellStyle}>
                <button
                  onClick={() => handleCopy(url.shortCode, "short")}
                  style={greenBtn}
                >
                  <img src="/images/copy.png" height={15} width={15}></img>
                </button>
              </td>

              <td style={cellStyle}>
                <button
                  onClick={() => handleCopy(url.shortCode, "analytics")}
                  style={blueBtn}
                >
                  <img src="/images/copy.png" height={15} width={15}></img>
                </button>
              </td>

              <td style={cellStyle}>{formatDateWithSuffix(url.createdOn)}</td>

              <td style={cellStyle}>{url.clickCount}</td>

              <td style={cellStyle}>
                <button onClick={() => onAnalytics(url.id)} style={blueBtn}>
                  <img src="/images/analysis.png" height={10} width={10}></img>{" "}
                  Analytics
                </button>
              </td>
            </tr>
          ))}

          {urls.length === 0 && !loading && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                No URLs found. Create your first short URL!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
