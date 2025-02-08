import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateGroupName, updateGroupImage } from "../../features/groupsSlice";
import useModal from "../Utils/useModal";
import Modal from "../Utils/Modal";
import { images } from "../Utils/images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiImageEditFill } from "react-icons/ri";


function GroupName({ group }) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(group.name);
  const [selectedImage, setSelectedImage] = useState(group.image);
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  useEffect(() => {
    setGroupName(group.name);
    setSelectedImage(group.image);
  }, [group.name, group.image]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length > 20) {
      value = value.slice(0, 20);
    }
    setGroupName(value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGroupName({ groupId: group.id, newName: groupName }));
    dispatch(updateGroupImage({ groupId: group.id, newImage: selectedImage }));
    toast.success(`Group details updated`, {
      position: "top-right",
      autoClose: 2000,
    });
    closeModal();
  };

  return (
    <section className="flex items-center space-x-10">
      <button onClick={openModal} className="relative w-20 h-20 mb-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={group.image}
          alt="group-logo"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
          <RiImageEditFill className="text-white text-3xl" />
        </div>
      </button>

      <div className="flex flex-col">
        <h1 className="text-header font-bold text-secondary dark:text-dark-text">
          {groupName}
        </h1>
        <p className="text-body dark:text-dark-text">{group.description}</p>
      </div>
      <button
        onClick={openModal}
        className="rounded-full hover:bg-white p-3 relative right-8 border border-transparent hover:border hover:border-black"
      >
        Edit
      </button>

      {isOpen && (
        <Modal
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold dark:text-dark-text">
                  Group Name
                </label>
                <input
                  autoFocus
                  type="text"
                  value={groupName}
                  onChange={handleInputChange}
                  className="border p-2 w-full dark:bg-dark-input"
                  placeholder="Enter new group name (max 20 characters)"
                  required
                />
              </div>
              <h2 className="text-2xl font-bold">Select an Image</h2>
              <div className="flex space-x-2 flex-wrap gap-3">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    className={`w-[4.3rem] h-[4.3rem] object-cover !m-0 rounded-full cursor-pointer ${
                      selectedImage === image ? "ring-[3px] ring-primary" : ""
                    }`}
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blizzard-blue hover:bg-primary hover:text-white text-primary dark:bg-dark-primary dark:border dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-primary dark:hover:border-primary"
              >
                Update
              </button>
            </form>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}
    </section>
  );
}

export default GroupName;
