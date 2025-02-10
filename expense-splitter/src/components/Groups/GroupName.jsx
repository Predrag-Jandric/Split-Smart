import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import EditGroupDetailsForm from "./EditGroupDetailsForm";
import { RiImageEditFill } from "react-icons/ri";

function GroupName({ group }) {
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  return (
    <section className="flex sm:items-center items-start gap-5">
      <button onClick={openModal} className="relative size-16 sm:size-20 mb-2">
        <img
          className="size-16 sm:size-20 shadow-custom-dark dark:shadow-custom-light rounded-full object-cover"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center dark:bg-darkBlack bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
          <RiImageEditFill className="text-white text-3xl dark:text-darkWhite" />
        </div>
      </button>

      <div className="flex flex-col text-black dark:text-darkBlack">
        <span className="flex items-center gap-6">
          <h1 className="text-header  font-bold text-secondary">{group.name}</h1>
          <button onClick={openModal} className="btnSecondary bg-mainBG dark:bg-darkmainBG">
            Edit
          </button>
        </span>

        <p className="font-body font-medium text-title dark:text-darkTitle sm:w-full w-44">
          {group.description}{" "}
          <span
            className="cursor-pointer hover:no-underline underline text-primary dark:text-darkPrimary"
            onClick={openModal}
          >
            {group.description ? "Edit" : "Add description"}
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
