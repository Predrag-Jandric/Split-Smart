import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeGroup } from "../../features/groupsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import { IoEnter } from "react-icons/io5";

function HomeIndividualGroup({ group }) {
  const dispatch = useDispatch();

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  const handleRemove = () => {
    dispatch(removeGroup(group.id));
    toast.success(`Group removed`, {
      position: "top-right",
      autoClose: 2000,
    });
    closeModal();
  };

  return (
    <section className="p-4 bg-white dark:bg-dark-primary rounded-xl  w-custom-card h-custom-card-height flex flex-col items-center">
      <Link to={`/groups/${group.id}`} className="relative w-20 h-20 mb-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
          <IoEnter className="text-white text-3xl" />
        </div>
      </Link>

      <p className="text-body font-medium text-title dark:text-dark-text-secondary">
        {group.members.length} members
      </p>

      <h2 className="font-bold text-center text-secondary dark:text-dark-text">
        {group.name}
      </h2>

      <div className="flex justify-between w-full mt-auto">
        <Link
          className="bg-blizzard-blue hover:shadow-custom-hover text-xl text-primary dark:bg-dark-primary dark:border dark:text-dark-text
             dark:hover:bg-dark-text dark:hover:text-primary dark:hover:border-primary font-bold rounded-lg w-32 h-10 flex items-center justify-center ml-4"
          to={`/groups/${group.id}`}
        >
          Details
        </Link>
        <button
          onClick={openModal}
          className="bg-blizzard-blue hover:shadow-custom-hover text-xl text-primary dark:bg-dark-primary dark:border dark:text-dark-text
          dark:hover:bg-dark-text dark:hover:text-primary dark:hover:border-primary  font-bold rounded-lg w-32 h-10 mb-4 flex items-center justify-center mr-4"
        >
          Remove
        </button>
      </div>

      {isOpen && (
        <Modal
          handleClickOutside={handleClickOutside}
          onClose={closeModal}
          content={
            <>
              <p>Are you sure?</p>
              <button
                onClick={handleRemove}
                className="px-4 py-2 rounded-xl bg-blizzard-blue dark:bg-dark-primary dark:border hover:bg-primary
                    hover:text-white text-primary dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-primary dark:hover:border-primary font-medium"
              >
                Yes
              </button>
            </>
          }
        />
      )}
    </section>
  );
}

export default HomeIndividualGroup;
