/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const RoomPaginator = ({ currentPage, totalPages, onChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
          >
            <button onClick={() => onChange(pageNumber)} className="page-link">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RoomPaginator
