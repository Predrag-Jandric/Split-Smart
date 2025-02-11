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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    setFilteredGroups(
      groups.filter((group) =>
        lowerCaseQuery
          .split("")
          .every((char) => group.name.toLowerCase().includes(char))
      )
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredGroups(groups);
  };

  const { isOpen, openModal, closeModal, handleClickOutside } =
    useModal(resetNewGroupState);

  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({
      ...newGroup,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
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

    clearSearch(); // Clear the search input
    closeModal(); // Close modal after submission
  };

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  return (
    <section className="text-xl  ">
      <article className="flex flex-col lg:text-start lg:flex-row gap-4 text-center items-center justify-between">
        <div className="text-black dark:text-darkBlack">
          <h1 className="text-header leading-[2.8rem] font-bold">
            Welcome to SplitSmart
          </h1>
          <p className="my-5 font-normal">
          An app to help you split expenses among friends easily.
          </p>
        </div>
        {groups.length > 0 && (
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            clearSearch={clearSearch}
          />
        )}
      </article>

      <article className="flex w-full justify-center sm:justify-start flex-wrap gap-8 mt-8">
        {groups.length < 10 && (
          <div className="bg-white dark:bg-darkWhite border-global dark:border-darkBorder border-border w-80 h-60 shadow-custom-dark dark:shadow-custom-light rounded-global flex items-center justify-center flex-col">
            <motion.button
              variants={jumpyAnimation} // Apply the jumpyAnimation
              initial="initial"
              animate={filteredGroups.length === 0 ? "animate" : "initial"} // Conditionally apply animation
              onClick={openModal} // Use openModal from the custom hook
              className={`size-16 transition text-5xl rounded-full ${
                filteredGroups.length === 0
                  ? "bg-primary dark:bg-darkPrimary dark:text-darkWhite text-white hover:bg-primaryHover dark:hover:bg-darkprimaryHover"
                  : "bg-transparent dark:bg-transparent hover:bg-primary dark:hover:bg-darkPrimary text-primary dark:text-darkPrimary hover:text-white dark:hover:text-darkWhite border-2 border-primary dark:border-darkPrimary"
              }`}
            >
              +
            </motion.button>
            <p className="text-2xl mt-4 font-bold text-black dark:text-darkBlack">
              Create Group
            </p>
          </div>
        )}

        {filteredGroups.length > 0
          ? filteredGroups.map((group) => (
              <HomeIndividualGroup key={group.id} group={group} />
            ))
          : searchQuery && (
              <p className="place-content-center text-center font-semibold w-80 h-60 text-black dark:text-darkBlack">
                No groups found
              </p>
            )}
      </article>

      {isOpen && ( // Use isOpen from the custom hook
        <Modal
          title="Create new group"
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold">Group Name</label>
                <input
                  autoFocus
                  type="text"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="(max 13 characters)"
                  required
                  maxLength="13"
                />
              </div>

              <button type="submit" className="btnPrimary h-12">
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

export default Home;
