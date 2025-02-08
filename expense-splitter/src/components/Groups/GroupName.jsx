import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import EditGroupDetailsForm from "./EditGroupDetailsForm";
import { RiImageEditFill } from "react-icons/ri";

function GroupName({ group }) {
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  return (
    <section className="flex items-center space-x-10">
      <button onClick={openModal} className="relative w-20 h-20 mb-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
          <RiImageEditFill className="text-white text-3xl" />
        </div>
      </button>

      <div className="flex flex-col">
        <span className="flex items-center gap-6">
          <h1 className="text-header font-bold text-secondary dark:text-dark-text">
            {group.name}
          </h1>
          <button
            onClick={openModal}
            className="w-[67px] h-8 py-1 px-3 bg-primary hover:bg-black hover:text-white text-white
       font-medium rounded-lg text-base ml-auto "
          >
            Edit
          </button>
        </span>

        <p className="text-body dark:text-dark-text">
          {group.description}
          <span className="cursor-pointer" onClick={openModal}>
            {group.description ? "" : "Add description"}
          </span>
        </p>
      </div>

      {isOpen && (
        <Modal
          content={
            <EditGroupDetailsForm group={group} closeModal={closeModal} />
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}
    </section>
  );
}

export default GroupName;
