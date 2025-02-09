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

  if (!group) {
    return <div>Group not found.</div>;
  }

  const handleRemoveMember = (memberId, memberName) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${memberName}?`
    );

    if (confirmed) {
      dispatch(removeMember({ groupId: parseInt(groupId), memberId }));

      // Show toast notification
      toast.success(`${memberName} removed`, {
        position: "top-right",
        autoClose: 2000,
      });
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
      className="bg-white flex flex-col  p-global rounded-global shadow-custom-dark
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
              className="bg-highlight flex items-center justify-center rounded-full font-extrabold text-lg text-alert hover:bg-red-400 w-6 h-6 absolute bottom-22 left-14"
            >
              x
            </button>
          </div>
        ))}
      </article>

      {/* MODAL */}
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
                  className="border p-2 w-full rounded-global shadow-custom-dark"
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
                    className={`w-[4.3rem] shadow-custom-dark h-[4.3rem] object-cover !m-0 rounded-full cursor-pointer ${
                      selectedImage === image ? "ring-[3px] ring-primary" : ""
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

      <ToastContainer />
    </section>
  );
}

export default GroupMembers;
