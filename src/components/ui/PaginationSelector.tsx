import { Fragment } from "react/jsx-runtime";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

type Props = {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function CustomPagination({
  pages,
  currentPage,
  onPageChange,
}: Props) {
  const getPageRange = () => {
    const range: number[] = [];
    const visiblePages = 5; // Number of page buttons to show (including current page)
    const halfVisible = Math.floor(visiblePages / 2);

    // Calculate the start and end pages
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, pages);
    // Adjust start and end pages if they exceed the bounds
    if (currentPage - halfVisible < 1) {
      endPage = Math.min(visiblePages, pages);
    } else if (currentPage + halfVisible > pages) {
      startPage = Math.max(pages - visiblePages + 1, 1);
    }

    // Add visible page numbers to the range
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageNumbers = getPageRange();

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <Fragment>
      <Pagination className="mt-5">
        <PaginationContent>
          {/* "First" button, hidden if on the first page */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                size="sm"
                className="border"
                href="#"
                onClick={() => handlePageChange(1)}>
                &laquo; First
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Page numbers */}
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                isActive={currentPage === number}
                onClick={() => handlePageChange(number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* "Last" button, hidden if on the last page */}
          {currentPage < pages && (
            <PaginationItem>
              <PaginationLink
                size="sm"
                className="border"
                href="#"
                onClick={() => handlePageChange(pages)}>
                Last &raquo;
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <div className="text-center my-3 text-sm text-gray-600">
        Page {currentPage} of {pages}
      </div>
    </Fragment>
  );
}
