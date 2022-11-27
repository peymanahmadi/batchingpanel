import { useAppContext } from "../../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages
      // alternative
      newPage = 1;
    }
    changePage(newPage);
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  return (
    <section className="btn-page-container">
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight /> next
      </button>
    </section>
  );
};

export default PageBtnContainer;
