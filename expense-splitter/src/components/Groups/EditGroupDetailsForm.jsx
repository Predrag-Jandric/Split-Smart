import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateGroupName,
  updateGroupImage,
  updateGroupDescription,
} from "../../features/groupsSlice";
import { images } from "../Utils/images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// edit group details form
export default function EditGroupDetailsForm({ group, closeModal }) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(group.name);
  const [selectedImage, setSelectedImage] = useState(group.image);
  const [groupDescription, setGroupDescription] = useState(group.description);

  // sets initial values
  useEffect(() => {
    setGroupName(group.name);
    setSelectedImage(group.image);
    setGroupDescription(group.description);
  }, [group.name, group.image, group.description]);

  // handle input change
  const handleInputChange = (e) => {
    let value = e.target.value;
    setGroupName(value.charAt(0).toUpperCase() + value.slice(1));
  };

  // handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // handle description change
  const handleDescriptionChange = (e) => {
    let value = e.target.value;
    setGroupDescription(value.charAt(0).toUpperCase() + value.slice(1));
  };

  // update group details
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGroupName({ groupId: group.id, newName: groupName }));
    dispatch(updateGroupImage({ groupId: group.id, newImage: selectedImage }));
    dispatch(
      updateGroupDescription({
        groupId: group.id,
        newDescription: groupDescription,
      }),
    );
    toast.success(`Group details updated`, {
      position: "top-right",
      autoClose: 2000,
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-body font-semibold">Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={handleInputChange}
          className="input"
          placeholder="(max 15 characters)"
          maxLength="15"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-body font-semibold">Description:</label>
        <textarea
          value={groupDescription}
          onChange={handleDescriptionChange}
          className="input"
          placeholder="(max 45 characters)"
          maxLength="45"
        />
      </div>
      <h2 className="font-semibold -mb-2">Select Image:</h2>
      <div className="flex flex-wrap gap-[1.125rem]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`group image`}
            className={`!m-0 h-[4.3rem] w-[4.3rem] cursor-pointer rounded-full object-cover shadow-custom-dark transition hover:scale-110 dark:shadow-custom-light ${
              selectedImage === image
                ? "ring-[3px] ring-primary dark:ring-darkPrimary"
                : ""
            }`}
            onClick={() => handleImageSelect(image)}
          />
        ))}
      </div>
      <button type="submit" className="btnPrimary mt-6 h-10 text-[1.05rem] font-semibold">
        Update
      </button>
    </form>
  );
}

