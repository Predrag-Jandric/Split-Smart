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

// home page where you see all the groups and a button to create a new group
export default function Home() {
  const groups = useSelector((state) => state.groups.groups);

  const resetNewGroupState = () => {
    setNewGroup({
      name: "",
    });
  };

  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [searchQuery, setSearchQuery] = useState("");

  // search bar functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    setFilteredGroups(
      groups.filter((group) =>
        group.name.toLowerCase().startsWith(lowerCaseQuery),
      ),
    );
  };

  // also search bar functionality
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

  // payload for creating a new group
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
        members: [],
      }),
    );

    setNewGroup({
      name: "",
    });
    toast.success(`Group added`, {
      position: "top-right",
      autoClose: 2000,
    });

    clearSearch();
    closeModal();
  };

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  return (
    <section className="text-xl">
      <article className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-start">
        <div className="text-black dark:text-darkBlack">
          <h1 className="text-header font-bold leading-[2.8rem]">
            Welcome to SplitSmart
          </h1>
          <p className="my-5 font-normal">
            An app to help you split expenses among friends easily.
          </p>
        </div>
        {/* if there are no groups, search bar is also not rendered */}
        {groups.length > 0 && (
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            clearSearch={clearSearch}
          />
        )}
      </article>

      {/* big card with a btn to create new group */}
      <article className="mt-8 flex w-full flex-wrap justify-center gap-8 sm:justify-start">
        {groups.length < 7 && (
          <div className="flex h-60 w-80 flex-col items-center justify-center rounded-global border-global border-border bg-white shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:shadow-custom-light">
            <motion.button
              variants={jumpyAnimation}
              initial="initial"
              animate={filteredGroups.length === 0 ? "animate" : "initial"}
              onClick={openModal}
              className={`size-16 rounded-full text-5xl transition ${
                filteredGroups.length === 0
                  ? "bg-primary text-white hover:bg-primaryHover dark:bg-darkPrimary dark:text-darkWhite dark:hover:bg-darkprimaryHover"
                  : "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white dark:border-darkPrimary dark:bg-transparent dark:text-darkPrimary dark:hover:bg-darkPrimary dark:hover:text-darkWhite"
              }`}
            >
              +
            </motion.button>
            <p className="mt-4 text-2xl font-bold text-black dark:text-darkBlack">
              Create Group
            </p>
          </div>
        )}

        {/* groups cards */}
        {filteredGroups.length > 0
          ? filteredGroups.map((group) => (
              <HomeIndividualGroup key={group.id} group={group} />
            ))
          : searchQuery && (
              <p className="h-60 w-80 place-content-center text-center font-semibold text-black dark:text-darkBlack">
                No groups found
              </p>
            )}
      </article>

      {/* MODAL to create a new group */}
      {isOpen && (
        <Modal
          title="Create new group"
          content={
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-body font-semibold">Group Name:</label>
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

              <button
                type="submit"
                className="btnPrimary h-10 text-[1.05rem] font-semibold"
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
