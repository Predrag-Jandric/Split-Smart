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
    <section className="p-4 w-80 h-60 bg-white shadow-custom-dark rounded-global flex flex-col items-center">
      <Link to={`/groups/${group.id}`} className="relative w-20 h-20 mb-2 ">
        <img
          className="w-20 h-20 rounded-full object-cover shadow-custom-dark"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
          <IoEnter className="text-white text-3xl" />
        </div>
      </Link>

      <p className="text-body font-medium text-title">
        {group.members.length} members
      </p>

      <h2 className="font-bold text-center text-secondary ">{group.name}</h2>

      <div className="flex justify-around w-full mt-auto">
        <Link
          className="btnPrimary"
          to={`/groups/${group.id}`}
        >
          Details
        </Link>
        <button
          onClick={openModal}
          className="btnSecondary border-alert hover:bg-alert text-black"
        >
          Remove
        </button>
      </div>

      {isOpen && (
  <Modal
    content={
      <>
        <p>Are you sure ?</p>
        <div className="flex justify-start gap-5 mt-4">
          <button
            onClick={handleRemove}
            className="btnPrimary"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="btnSecondary border-alert hover:bg-alert text-black"
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


