import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMember, removeMember } from "../../features/groupsSlice";
import { useState } from "react";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imagesPeople } from "../Utils/images";
import unknownPerson from "../../assets/unknownPerson.jpg";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../Utils/animations";
import { IoClose } from "react-icons/io5";

// this component is responsible for adding and removing members of a group. based on this,
// contributions in the GroupChart.jsx will be set.
function GroupMembers() {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId)),
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [newMember, setNewMember] = useState({ name: "", image: "" });
  const [selectedImage, setSelectedImage] = useState("");
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  if (!group) {
    return <div>Group not found.</div>;
  }

  // remove member
  const handleRemoveMember = (memberId, memberName) => {
    setMemberToRemove({ id: memberId, name: memberName });
    setIsRemoveModalOpen(true);
  };

  // confirmation of member removal
  const confirmRemoveMember = () => {
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
      setIsRemoveModalOpen(false);
    }
  };

  // add member and make its name always capitalised
  const handleAddMemberInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  // submit data payload for new member
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addMember({
        groupId: parseInt(groupId),
        member: {
          name: newMember.name,
          image: selectedImage || unknownPerson,
        },
      }),
    );

    toast.success(`${newMember.name} added`, {
      position: "top-right",
      autoClose: 2000,
    });

    setNewMember({ name: "", image: "" });
    setSelectedImage("");
    closeModal();
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <section className="flex w-full flex-col rounded-global border-global border-border bg-white p-global text-black shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:text-darkBlack dark:shadow-custom-light">
      <div className="flex h-12 w-full justify-between">
        <p className="text-subheader font-bold">
          Members{" "}
          <span className="ml-2 font-normal">
            ({group.members.length})
          </span>{" "}
        </p>
        {group.totalBudget !== 0 && group.members.length < 10 && (
          <motion.button
            animate={
              group.members.length === 0 && group.totalBudget !== 0
                ? "animate"
                : "initial"
            }
            variants={jumpyAnimation}
            onClick={openModal}
            className={
              group.members.length !== 0 ? "btnSecondary" : "btnPrimary"
            }
          >
            Add
          </motion.button>
        )}
      </div>

      {/* small section containing each member image and name and remove btn */}
      <article className="mt-5 flex flex-wrap justify-start gap-4">
        {group.members.map((member) => (
          <div
            key={member.id}
            className="relative flex w-20 flex-col items-center text-center"
          >
            <img
              className="h-[4rem] w-[4rem] rounded-full object-cover"
              src={member.image}
              alt={member.name}
            />
            <p className="w-full pt-2">{member.name}</p>

            <button
              onClick={() => handleRemoveMember(member.id, member.name)}
              className="bottom-22 absolute left-14 flex h-5 w-5 items-center justify-center rounded-full bg-alert text-lg font-extrabold text-white transition-all hover:text-black dark:bg-darkAlert dark:text-darkWhite dark:hover:text-darkBlack"
            >
              <IoClose className="size-4" />
            </button>
          </div>
        ))}
      </article>

      {/* MODAL for adding member */}
      {isOpen && (
        <Modal
          title="Add new member"
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold">Name</label>

                <input
                  autoFocus
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleAddMemberInputChange}
                  className="input"
                  placeholder="(max 13 characters)"
                  required
                  maxLength="13"
                />
              </div>

              <h2 className="font-semibold">Select Image</h2>
              <div className="flex flex-wrap gap-5">
                {imagesPeople.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    className={`!m-0 h-[4.3rem] w-[4.3rem] cursor-pointer rounded-full object-cover shadow-custom-dark transition hover:scale-110 dark:shadow-custom-light ${
                      selectedImage === image
                        ? "ring-[3px] ring-primary dark:ring-darkPrimary"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>

              <button type="submit" className="btnPrimary h-12">
                Add Member
              </button>
            </form>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}

      {/* MODAL for removing member */}
      {isRemoveModalOpen && (
        <Modal
          title={`Remove ${memberToRemove?.name}  `}
          content={
            <>
              <p>Are you sure?</p>
              <div className="mt-4 flex justify-start gap-5">
                <button onClick={confirmRemoveMember} className="btnPrimary">
                  Yes
                </button>
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="btnSecondary border-alert text-black hover:bg-alert dark:border-darkAlert dark:text-darkBlack dark:hover:bg-darkAlert"
                >
                  No
                </button>
              </div>
            </>
          }
          onClose={() => setIsRemoveModalOpen(false)}
          handleClickOutside={() => setIsRemoveModalOpen(false)}
        />
      )}

      <ToastContainer />
    </section>
  );
}

export default GroupMembers;
