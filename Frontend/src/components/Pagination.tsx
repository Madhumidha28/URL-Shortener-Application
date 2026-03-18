import React from "react";

interface PaginationProps {
  urlsPerPage: number;
  totalUrls: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  urlsPerPage,
  totalUrls,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUrls / urlsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) return null;

  const totalPages = Math.ceil(totalUrls / urlsPerPage);

  return (
    <nav style={{ marginTop: "20px" }}>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          listStyle: "none",
          padding: 0,
          gap: "5px",
          alignItems: "center",
        }}
      >
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #dee2e6",
              backgroundColor: "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            &lt;
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{
                padding: "8px 12px",
                border: "1px solid #dee2e6",
                backgroundColor: currentPage === number ? "#3498db" : "white",
                color: currentPage === number ? "white" : "#333",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              border: "1px solid #dee2e6",
              backgroundColor: "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
