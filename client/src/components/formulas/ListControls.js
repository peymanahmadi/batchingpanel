import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const ListControls = ({ handleMoveLeft, handleMoveRight }) => {
  return (
    <div className="buttons">
      <BsChevronDoubleLeft />
      <BsChevronLeft onClick={handleMoveLeft} />
      <BsChevronRight onClick={handleMoveRight} />
      <BsChevronDoubleRight />
    </div>
  );
};

export default ListControls;
