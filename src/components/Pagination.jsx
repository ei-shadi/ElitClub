import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-md md:text-xl font-medium transition-colors hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
      >
        <FaChevronLeft className="mr-1" />
        Prev
      </button>

      {/* Page Numbers */}
      {getPages().map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`inline-flex items-center justify-center rounded-md border border-input px-3 py-1 text-md md:text-xl font-medium transition-colors cursor-pointer ${
            page === currentPage
              ? 'bg-[#FF02CB] text-white'
              : 'bg-[#EFEAE6] hover:bg-black hover:text-white'
          } ${page === '...' ? 'cursor-pointer text-gray-400' : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-md md:text-xl font-medium transition-colors hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
      >
        Next
        <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
