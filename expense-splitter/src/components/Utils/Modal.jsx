import { IoClose } from "react-icons/io5";

const Modal = ({ content, onClose, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="!m-0 fixed z-50 text-black dark:text-darkBlack inset-0 bg-black dark:bg-darkBlack bg-opacity-50 flex justify-center items-center"
      onClick={handleClickOutside}
    >
      <article className="bg-white dark:bg-darkWhite border-global dark:border-darkBorder border-border p-10 rounded-global w-[30rem] shadow-custom-dark dark:shadow-custom-light">
        <div className="flex justify-between items-center">
        <h2 className="text-secondary text-2xl mb-4 font-bold">Create New</h2>

          <button
            className="bg-white flex items-center justify-center dark:bg-darkWhite transition-colors shadow-custom-dark dark:shadow-custom-light rounded-full border-global hover:bg-alert dark:hover:bg-darkAlert hover:text-white dark:hover:text-darkWhite border-border dark:border-darkBorder w-10 h-10 text-alert dark:text-darkAlert"
            onClick={onClose}
          >
          <IoClose className="size-6" />
          </button>
        </div>
        {content}
      </article>
    </section>
  );
};

export default Modal;
