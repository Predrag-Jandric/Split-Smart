import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeGroup } from "../../features/groupsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import { IoEnter } from "react-icons/io5";

// this component is a single group card on the homepage
function HomeIndividualGroup({ group }) {
  const dispatch = useDispatch();

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  // remove group from the homepage list
  const handleRemove = () => {
    dispatch(removeGroup(group.id));
    toast.success(`Group removed`, {
      position: "top-right",
      autoClose: 2000,
    });
    closeModal();
  };

  return (
    <section className="flex h-60 w-80 flex-col items-center rounded-global border-global border-border bg-white p-4 shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:shadow-custom-light">
      {/* group image which is actually clickable and will lead user to the page of that specific group */}
      <Link to={`/groups/${group.id}`} className="relative mb-2 h-20 w-20">
        <img
          className="h-20 w-20 rounded-full object-cover shadow-custom-dark dark:shadow-custom-light"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <IoEnter className="text-3xl text-white" />
        </div>
      </Link>

      <p className="text-body font-medium text-title dark:text-darkTitle">
        {group.members.length} members
      </p>

      <h2 className="text-center font-bold text-black dark:text-darkBlack">
        {group.name}
      </h2>

      <div className="mt-auto flex w-full justify-around">
        <Link className="btnPrimary w-28 text-lg" to={`/groups/${group.id}`}>
          Details
        </Link>
        <button
          onClick={openModal}
          className="btnSecondary w-28 border-alert/80 bg-alert/0 text-lg hover:bg-alert dark:border-alert/50 dark:bg-alert/0 dark:hover:bg-alert"
        >
          Delete
        </button>
      </div>

      {/* modal to confirm removal of a single group */}
      {isOpen && (
        <Modal
          title={`Delete ${group.name}`}
          content={
            <>
              <p>Are you sure ?</p>
              <div className="mt-4 flex justify-start gap-5">
                <button onClick={handleRemove} className="btnPrimary h-12">
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="btnSecondary h-12 border-alert text-black transition-all hover:bg-alert dark:border-darkAlert dark:text-darkBlack dark:hover:bg-darkAlert"
                >
                  No
                </button>
              </div>
            </>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}
    </section>
  );
}

export default HomeIndividualGroup;
