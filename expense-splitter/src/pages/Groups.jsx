// react
import { useParams } from "react-router-dom";
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { updateGroupBudget, updateGroupExpense } from "../features/groupsSlice";
import useModal from "../components/Utils/useModal";
import Modal from "../components/Utils/Modal";
// components
import GroupChart from "../components/Groups/GroupChart";
import ExpenseBar from "../components/Groups/GroupExpenseBar";
import GroupMembers from "../components/Groups/GroupMembers";
import GroupName from "../components/Groups/GroupName";
import GroupSmallExpenseCard from "../components/Groups/GroupSmallExpenseCard";
// icons
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Groups() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId))
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [formData, setFormData] = useState({
    totalBudget: "",
    totalExpense: "",
  });

  if (!group) {
    return (
      <div className="text-header font-bold text-secondary">
        Group not found
      </div>
    );
  }

  const handleEditClick = () => {
    setFormData({
      totalBudget: "",
      totalExpense: "",
    });
    openModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateGroupBudget({
        groupId: parseInt(groupId),
        totalBudget: parseFloat(formData.totalBudget),
      })
    );
    dispatch(
      updateGroupExpense({
        groupId: parseInt(groupId),
        totalExpense: parseFloat(formData.totalExpense),
      })
    );
    setFormData({
      totalBudget: "",
      totalExpense: "",
    });

    toast.success(`Budget and expense updated`, {
      position: "top-right",
      autoClose: 2000,
    });

    closeModal();
  };

  const totalBudget = group.totalBudget;
  const totalExpense = group.totalExpense;
  const remainingBudget = totalBudget - totalExpense;

  return (
    <section className="flex flex-col gap-6 m-6">
      <GroupName group={group} />

      <div className="flex gap-5 flex-col md:flex-row">
        <GroupSmallExpenseCard
          icon={GiMoneyStack}
          label="Total budget"
          value={totalBudget}
          button={totalBudget === 0 ? "Add" : "Edit"}
          onClick={handleEditClick}
          totalBudget={totalBudget}
        />
        <GroupSmallExpenseCard
          icon={MdOutlineShoppingCart}
          label="Total expense"
          value={totalExpense}
        />
        <GroupSmallExpenseCard
          icon={LiaMoneyBillWaveAltSolid}
          label="Remaining budget"
          value={remainingBudget}
        />
      </div>

      {/* Flex container for ExpenseBar and GroupChart styling */}
      <div className="flex flex-col gap-6 lg:flex-row w-full">
        {/* Left column container */}
        <div className="flex  gap-6 flex-col lg:w-1/2 min-w-0">
          <GroupMembers members={group.members} />
          <ExpenseBar expense={totalExpense} budget={totalBudget} />
        </div>
        <div className="lg:w-1/2 min-w-0">
          {" "}
          {/* GroupChart will take the available width */}
          <GroupChart groupId={groupId} />
        </div>
      </div>

      {isOpen && (
        <Modal
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold">Budget</label>

                <input
                  type="number"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleInputChange}
                  className="border shadow-custom-dark p-2 w-full rounded-global"
                  placeholder="Enter new budget"
                  required
                />
              </div>

              <div>
                <label className="text-body font-semibold ">Expense</label>

                <input
                  type="number"
                  name="totalExpense"
                  value={formData.totalExpense}
                  onChange={handleInputChange}
                  className="border shadow-custom-dark p-2 w-full rounded-global"
                  placeholder="Enter new expense"
                  required
                />
              </div>

              <button
                type="submit"
                className="btnPrimary h-12"
              >
                Update
              </button>
            </form>
          }
          onClose={closeModal} // Close modal when clicking close button or outside the modal
          handleClickOutside={handleClickOutside} // Close modal when clicking outside
        />
      )}
    </section>
  );
}

export default Groups;
