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

function EditGroupDetailsForm({ group, closeModal }) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(group.name);
  const [selectedImage, setSelectedImage] = useState(group.image);
  const [groupDescription, setGroupDescription] = useState(group.description);

  useEffect(() => {
    setGroupName(group.name);
    setSelectedImage(group.image);
    setGroupDescription(group.description);
  }, [group.name, group.image, group.description]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setGroupName(value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleDescriptionChange = (e) => {
    let value = e.target.value;
    setGroupDescription(value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGroupName({ groupId: group.id, newName: groupName }));
    dispatch(updateGroupImage({ groupId: group.id, newImage: selectedImage }));
    dispatch(
      updateGroupDescription({
        groupId: group.id,
        newDescription: groupDescription,
      })
    );
    toast.success(`Group details updated`, {
      position: "top-right",
      autoClose: 2000,
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-body font-semibold">Name</label>
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
      <div>
        <label className="text-body font-semibold ">Description</label>
        <textarea
          value={groupDescription}
          onChange={handleDescriptionChange}
          className="input"
          placeholder="(max 45 characters)"
          maxLength="45"
        />
      </div>
      <h2 className="font-semibold">Select Image</h2>
      <div className="flex flex-wrap gap-5">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            className={`w-[4.3rem] transition hover:scale-110 shadow-custom-dark dark:shadow-custom-light h-[4.3rem] object-cover !m-0 rounded-full cursor-pointer ${
              selectedImage === image
                ? "ring-[3px] dark:ring-darkPrimary ring-primary"
                : ""
            }`}
            onClick={() => handleImageSelect(image)}
          />
        ))}
      </div>
      <button type="submit" className="btnPrimary h-12">
        Update
      </button>
    </form>
  );
}

export default EditGroupDetailsForm;
