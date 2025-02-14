import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMember } from "../../features/groupsSlice";
import { useState } from "react";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imagesPeople } from "../Utils/images";
import unknownPerson from "../../assets/unknownPerson.jpg";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../Utils/animations";
import GroupsEachMember from "./GroupsEachMember";

// this component is responsible for adding and removing members of a group. based on this,
// contributions in the GroupChart.jsx will be set.
export default function GroupMembers() {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId)),
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [newMember, setNewMember] = useState({ name: "", image: "" });
  const [selectedImage, setSelectedImage] = useState("");

  if (!group) {
    return <div>Group not found.</div>;
  }

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
            // note to self, add bg-red-200 to line under to better checking for aligments
            className="relative flex flex-col items-center"
          >
            <GroupsEachMember
              member={{
                id: member.id,
                name: member.name,
                img: member.image,
              }}
            />
          </div>
        ))}
      </article>

      {/* MODAL for adding member */}
      {isOpen && (
        <Modal
          title="Create new member"
          content={
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-body font-semibold">Name:</label>

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

              <h2 className="-mb-2 font-semibold">Select Image:</h2>
              <div className="flex flex-wrap gap-5">
                {imagesPeople.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`member image`}
                    className={`!m-0 h-[4.3rem] w-[4.3rem] cursor-pointer rounded-full object-cover shadow-custom-dark transition hover:scale-110 dark:shadow-custom-light ${
                      selectedImage === image
                        ? "ring-[3px] ring-primary dark:ring-darkPrimary"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="btnPrimary mt-6 h-10 text-[1.05rem] font-semibold"
              >
                Create
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

