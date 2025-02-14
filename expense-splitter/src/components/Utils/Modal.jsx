import { IoClose } from "react-icons/io5";
import { modalAnimation } from "./animations";
import { motion } from "framer-motion";

const Modal = ({ title, content, onClose, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-darkmainBG bg-opacity-80 p-4 text-black dark:text-darkBlack"
      onClick={handleClickOutside}
    >
      <motion.article
        {...modalAnimation}
        className="relative  flex max-h-[90vh] w-full max-w-lg flex-col gap-6 overflow-y-auto rounded-global border-global border-border bg-white p-6 shadow-custom-dark dark:border-darkBorder dark:bg-darklegendBG dark:shadow-custom-light"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border-global border-border bg-alert/15 text-alert shadow-custom-dark transition-colors hover:bg-alert hover:text-white dark:border-darkBorder dark:bg-alert/20 dark:text-darkAlert dark:shadow-custom-light dark:hover:bg-darkAlert dark:hover:text-darkWhite"
            onClick={onClose}
          >
            <IoClose className="h-6 w-10" />
          </button>
        </div>
        {content}
      </motion.article>
    </section>
  );
};

export default Modal;
