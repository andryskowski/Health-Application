import React from 'react';

const Pagination = ({ dishesPerPage, totalDishes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDishes / dishesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' className="pagination-number">
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;