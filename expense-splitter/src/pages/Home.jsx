import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../features/groupsSlice";
import HomeIndividualGroup from "../components/Home/HomeIndividualGroup";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Utils/Modal";
import useModal from "../components/Utils/useModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRandomImage } from "../components/Utils/images";

function Home() {
  const groups = useSelector((state) => state.groups.groups);

  const resetNewGroupState = () => {
    setNewGroup({
      name: "",
    });
  };

  const [filteredGroups, setFilteredGroups] = useState(groups);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    setFilteredGroups(
      groups.filter((group) =>
        lowerCaseQuery.split("").every((char) => group.name.toLowerCase().includes(char))
      )
    );
  };

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal(resetNewGroupState);

  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({
      ...newGroup,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addGroup({
        id: Date.now(),
        name: newGroup.name,
        image: getRandomImage(),
        description: "",
        totalBudget: 0,
        totalExpense: 0,
        members: [], // empty for now
      })
    );

    setNewGroup({
      name: "",
    });
    toast.success(`Group added`, {
      position: "top-right",
      autoClose: 2000,
    });

    closeModal(); // Close modal after submission
  };

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  return (
    <section className="text-xl text-secondary  p-5 space-y-5 h-screen ">
      <article className="flex items-center justify-between ">
        <div>
          <h1 className="text-header font-bold text-secondary dark:text-dark-text ml-8 mt-8">
            Welcome to SplitSmart!
          </h1>
          <p className="text-sm font-normal text-secondary dark:text-dark-text ml-8 mb-8 pt-6">
            Tracks expenses, calculates costs, and settles debts with friends
            &#128522;
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </article>

      <article className="flex flex-wrap gap-10 mx-8">
        <div className="bg-white dark:bg-dark-primary rounded-2xl w-custom-card h-custom-card-height shadow flex items-center justify-center flex-col">
          <button
            onClick={openModal} // Use openModal from the custom hook
            className="hover:animate-ping rounded-full bg-primary primary-dark-mode w-16 h-16 text-5xl text-white dark:text-dark-text hover:bg-primary"
          >
            +
          </button>
          <p className="text-2xl mt-4 font-bold dark:text-dark-text">
            Add Group
          </p>
        </div>

        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <HomeIndividualGroup key={group.id} group={group} />
          ))
        ) : (
          <p className="ml-8 place-content-center">No groups found</p>
        )}
      </article>

      {isOpen && ( // Use isOpen from the custom hook
        <Modal
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold dark:text-dark-text">
                  Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full dark:bg-dark-input"
                  placeholder="Enter group name"
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-xl dark:bg-dark-primary"
              >
                Add Group
              </button>
            </form>
          }
          onClose={closeModal} // Pass onClose handler to close modal
          handleClickOutside={handleClickOutside} // Pass click outside handler
        />
      )}

      <ToastContainer />
    </section>
  );
}

export default Home;
