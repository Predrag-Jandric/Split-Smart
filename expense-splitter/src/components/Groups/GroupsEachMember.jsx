import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeMember } from "../../features/groupsSlice";
import { useState } from "react";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

export default function GroupsEachMember({ member }) {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [memberToRemove, setMemberToRemove] = useState(null);
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  // remove member
  const handleRemoveMember = (memberId, memberName) => {
    setMemberToRemove({ id: memberId, name: memberName });
    openModal();
  };

  // confirmation of member removal
  const handleRemove = () => {
    if (memberToRemove) {
      dispatch(
        removeMember({
          groupId: parseInt(groupId),
          memberId: memberToRemove.id,
        }),
      );

      toast.success(`${memberToRemove.name} removed`, {
        position: "top-right",
        autoClose: 2000,
      });

      setMemberToRemove(null);
      closeModal();
    }
  };

  return (
    <section className="flex w-20 flex-col items-center text-center">
      <img
        className="h-[4rem] w-[4rem] rounded-full object-cover shadow-custom-dark dark:shadow-custom-light"
        src={member.img}
        alt={member.name}
      />

      <p className="w-full pt-2">{member.name}</p>

      <button
        onClick={() => handleRemoveMember(member.id, member.name)}
        className="bottom-22 absolute left-14 flex h-5 w-5 items-center justify-center rounded-full bg-alert text-lg font-extrabold text-white transition-all hover:text-black dark:bg-darkAlert dark:text-darkWhite dark:hover:text-darkBlack"
      >
        <IoClose className="size-4" />
      </button>

      {/* MODAL for removing member */}
      {isOpen && (
        <Modal
          title={`Removing ${memberToRemove?.name}`}
          content={
            <>
              <p className="mb-6 text-center text-xl">Are you sure?</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleRemove}
                  className="btnPrimary h-10 w-full text-[1.05rem] font-semibold"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="btnSecondary h-10 w-full border-alert text-[1.05rem] font-semibold text-black transition-all hover:bg-alert dark:border-darkAlert dark:text-darkBlack dark:hover:bg-darkAlert"
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

