import { Button } from "@ueb-development/ui/components/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  return (
    <div className="flex items-center ">
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2 h-8 text-xs"
      >
        Anterior
      </Button>
      <div className="flex items-center gap-1">
        {currentPage > 3 && <span className="px-1.5 text-xs">...</span>}
        {pagesAroundCurrent.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            onClick={() => onPageChange(page)}
            className="h-8 w-8 rounded-lg px-0 text-xs"
          >
            {page}
          </Button>
        ))}
        {currentPage < totalPages - 2 && <span className="px-1.5 text-xs">...</span>}
      </div>
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2 h-8 text-xs"
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;