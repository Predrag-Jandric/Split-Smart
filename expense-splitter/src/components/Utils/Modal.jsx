import { IoClose } from "react-icons/io5";

const Modal = ({ title, content, onClose, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="fixed inset-0 z-50 !m-0 flex items-center justify-center bg-darkmainBG bg-opacity-80 text-black dark:text-darkBlack"
      onClick={handleClickOutside}
    >
      <article className="m-5 w-[90%] rounded-global border-global border-border bg-white p-10 shadow-custom-dark dark:border-darkBorder dark:bg-darklegendBG dark:shadow-custom-light sm:w-[32rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border-global border-border bg-alert/15 text-alert shadow-custom-dark transition-colors hover:bg-alert hover:text-white dark:border-darkBorder dark:bg-alert/20 dark:text-darkAlert dark:shadow-custom-light dark:hover:bg-darkAlert dark:hover:text-darkWhite"
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
