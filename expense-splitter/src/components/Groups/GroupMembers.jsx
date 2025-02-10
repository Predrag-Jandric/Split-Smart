import GroupsEachMember from "./GroupsEachMember";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMember, removeMember } from "../../features/groupsSlice";
import { useState } from "react";
// modal
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imagesPeople } from "../Utils/images";
import unknownPerson from "../../assets/unknownPerson.jpg";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../Utils/animations";

function GroupMembers() {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const maxMembers = 10;

  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId))
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [newMember, setNewMember] = useState({ name: "", image: "" });
  const [selectedImage, setSelectedImage] = useState("");
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  if (!group) {
    return <div>Group not found.</div>;
  }

  const handleRemoveMember = (memberId, memberName) => {
    setMemberToRemove({ id: memberId, name: memberName });
    setIsRemoveModalOpen(true);
  };

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      dispatch(
        removeMember({
          groupId: parseInt(groupId),
          memberId: memberToRemove.id,
        })
      );

      // Show toast notification
      toast.success(`${memberToRemove.name} removed`, {
        position: "top-right",
        autoClose: 2000,
      });

      setMemberToRemove(null);
      setIsRemoveModalOpen(false);
    }
  };

  const handleAddMemberInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addMember({
        groupId: parseInt(groupId),
        member: {
          name: newMember.name,
          image: selectedImage || unknownPerson,
        },
      })
    );
    // Show toast notification
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
    <section
      className="bg-white dark:bg-darkWhite flex flex-col border-global border-border p-global rounded-global shadow-custom-dark dark:shadow-custom-light dark:border-darkBorder dark:text-darkBlack text-black
      w-full"
    >
      <div className="flex w-full justify-between h-12">
        <p className="text-subheader font-bold text-secondary">Members</p>
        {group.totalBudget !== 0 && group.members.length < maxMembers && (
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

      {/* note to self, add bg-red-500 to line under to better checking for aligments */}
      <article className="mt-5 gap-4 flex flex-wrap justify-start ">
        {group.members.map((member) => (
          <div
            key={member.id}
            // note to self, add bg-red-200 to line under to better checking for aligments
            className="relative flex flex-col items-center"
          >
            <GroupsEachMember
              member={{
                name: member.name,
                img: member.image,
              }}
            />

            <button
              onClick={() => handleRemoveMember(member.id, member.name)}
              className="bg-alert dark:bg-darkAlert flex items-center justify-center rounded-full font-extrabold text-lg dark:text-darkWhite text-white transition-all hover:text-black dark:hover:text-darkBlack w-5 h-5 absolute bottom-22 left-14"
            >
              x
            </button>
          </div>
        ))}
      </article>

      {/* MODAL for adding member */}
      {isOpen && ( // Conditionally render Modal if it's open
        <Modal
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
                  className="border-global dark:border-darkBorder border-border p-2 w-full rounded-global shadow-custom-dark dark:shadow-custom-light"
                  placeholder="Enter member name"
                  required
                  maxLength="10"
                />
              </div>

              <h2 className="text-2xl font-bold">Select an Image</h2>
              <div className="flex space-x-2 flex-wrap gap-3">
                {imagesPeople.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    className={`w-[4.3rem] shadow-custom-dark dark:shadow-custom-light h-[4.3rem] object-cover !m-0 rounded-full cursor-pointer ${
                      selectedImage === image ? "ring-[3px] ring-primary dark:ring-darkPrimary" : ""
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
          content={
            <>
              <p>Are you sure you want to remove {memberToRemove?.name}?</p>
              <div className="flex justify-start gap-5 mt-4">
                <button onClick={confirmRemoveMember} className="btnPrimary">
                  Yes
                </button>
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="btnSecondary border-alert dark:border-darkAlert dark:hover:bg-darkAlert hover:bg-alert text-black dark:text-darkBlack"
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
