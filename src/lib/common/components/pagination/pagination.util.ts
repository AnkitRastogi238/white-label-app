/**
 * Function to create a pagination list based on the current page and total pages
 * @param currentPage - current page value
 * @param limit - number of data shown in one page
 * @param maxVisiblePages - max number of pagination numbers visible
 * @param totalPages - total number of pages
 * @returns an array of pages
 */
export const createPagination = (
    currentPage: number,
    limit: number,
    maxVisiblePages: number,
    totalPages: number
  ) => {
    const pages = [];
  
    let startPage = Math.max(currentPage - limit, 1);
    let endPage = Math.min(startPage + limit, totalPages);
  
    // Add the pages to the array
    if (totalPages <= maxVisiblePages) {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 4;
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages;
        pages.push(1);
        pages.push('...');
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
        pages.push(1);
        pages.push('...');
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
  
    return pages;
  };
  