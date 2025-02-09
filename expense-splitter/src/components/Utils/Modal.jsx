const Modal = ({ content, onClose, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="!m-0 fixed  z-50 inset-0 bg-black bg-opacity-20 flex justify-center items-center"
      onClick={handleClickOutside}
    >
      <article className="bg-white border-global border-border p-10 rounded-global w-[30rem] shadow-custom-dark">
        <div className="flex justify-between items-center">
        <h2 className="text-secondary text-2xl mb-4 font-bold">Create New</h2>

          <button
            className="bg-white transition-colors shadow-custom-dark rounded-full border-global hover:bg-alert hover:text-white border-border w-10 h-10 text-alert"
            onClick={onClose}
          >
            x
          </button>
        </div>
        {content}
      </article>
    </section>
  );
};

export default Modal;
