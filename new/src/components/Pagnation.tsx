import React from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination d-flex justify-content-center mt-5">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href="#" className="page-link">&laquo;</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href="#" className="page-link">&raquo;</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
