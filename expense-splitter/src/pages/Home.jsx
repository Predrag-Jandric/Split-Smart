import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../features/groupsSlice";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../components/Utils/animations";
import HomeIndividualGroup from "../components/Home/HomeIndividualGroup";
import SearchBar from "../components/Home/SearchBar";
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
        lowerCaseQuery
          .split("")
          .every((char) => group.name.toLowerCase().includes(char))
      )
    );
  };

  const { isOpen, openModal, closeModal, handleClickOutside } =
    useModal(resetNewGroupState);

  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (newValue.length > 20) {
      newValue = newValue.slice(0, 20);
    }
    setNewGroup({
      ...newGroup,
      [name]: newValue.charAt(0).toUpperCase() + newValue.slice(1),
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
    <section className="text-xl text-secondary p-5 space-y-5">
      <article className="flex flex-col m-4 lg:text-start lg:flex-row gap-4 text-center items-center justify-center">
        <div>
          <h1 className="text-header font-bold text-secondary">
            Welcome to SplitSmart!
          </h1>
          <p className="my-5 font-normal text-secondary">
            Tracks expenses, calculates costs, and settles debts with friends
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </article>

      <article className="flex flex-wrap gap-10 mx-8">
        <div className="bg-white shadow-custom-dark rounded-global w-custom-card h-custom-card-height flex items-center justify-center flex-col">
          <motion.button
            variants={jumpyAnimation} // Apply the jumpyAnimation
            initial="initial"
            animate="animate"
            onClick={openModal} // Use openModal from the custom hook
            className="rounded-full bg-primary primary-dark-mode w-16 h-16 text-5xl text-white shadow-custom-dark hover:bg-primary"
          >
            +
          </motion.button>
          <p className="text-2xl mt-4 font-bold ">
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
                <label className="text-body font-semibold">
                  Group Name
                </label>
                <input
                  autoFocus
                  type="text"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded-global shadow-custom-dark"
                  placeholder="Enter group name"
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 shadow-custom-dark bg-primary text-white rounded-global"
              >
                Add Group
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

export default Home;
