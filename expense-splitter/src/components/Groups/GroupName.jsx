import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import EditGroupDetailsForm from "./EditGroupDetailsForm";
import { RiImageEditFill } from "react-icons/ri";

// this component contains the group name, description and image. it also allows the user to edit the group details. by opening a modal that is in "EditGroupDetailsForm.jsx".
function GroupName({ group }) {
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  return (
    <section className="flex items-start gap-5 sm:items-center">
      {/* clickable and editable group image */}
      <button onClick={openModal} className="relative mb-2 size-16 sm:size-20">
        <img
          className="size-16 rounded-full object-cover shadow-custom-dark dark:shadow-custom-light sm:size-20"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <RiImageEditFill className="text-3xl text-white" />
        </div>
      </button>

      {/* group name and description */}
      <div className="flex flex-col text-black dark:text-darkBlack">
        <span className="flex items-center gap-6">
          <h1 className="text-header font-bold">{group.name}</h1>
          <button
            onClick={openModal}
            className="btnSecondary bg-mainBG dark:bg-darkPrimary/10"
          >
            Edit
          </button>
        </span>
        <p className="font-body font-medium text-title dark:text-darkTitle">
          {group.description}{" "}
          <span
            className="cursor-pointer text-primary no-underline hover:underline dark:text-darkPrimary"
            onClick={openModal}
          >
            {group.description ? "Edit" : "Add description"}
          </span>
        </p>
      </div>

      {/* modal for editing group details which is it's own separate component */}
      {isOpen && (
        <Modal
          title="Edit Group Details"
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
