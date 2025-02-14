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
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Groups() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId)),
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [formData, setFormData] = useState({
    totalBudget: "",
    totalExpense: "",
  });

  if (!group) {
    return <div className="text-header font-bold">Group not found</div>;
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
    if (value.length <= 5) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalBudget = parseFloat(formData.totalBudget);
    const totalExpense = parseFloat(formData.totalExpense);

    if (totalExpense > totalBudget) {
      toast.error("Expense cannot be higher than the budget", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    if (group.totalBudget === 0) {
      toast.success("Budget added", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.success("Budget updated", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    dispatch(
      updateGroupBudget({
        groupId: parseInt(groupId),
        totalBudget,
      }),
    );
    dispatch(
      updateGroupExpense({
        groupId: parseInt(groupId),
        totalExpense,
      }),
    );
    setFormData({
      totalBudget: "",
      totalExpense: "",
    });

    closeModal();
  };

  const totalBudget = group.totalBudget;
  const totalExpense = group.totalExpense;
  const remainingBudget = totalBudget - totalExpense;

  return (
    <section className="flex flex-col gap-5">
      <GroupName group={group} />

      {/* the three small cards that you see near the top on individual group page. the first one has a btn to edit budget adn expense */}
      <div className="flex flex-col gap-5 md:flex-row">
        <GroupSmallExpenseCard
          icon={GiMoneyStack}
          label="Total budget"
          value={totalBudget}
          button={totalBudget === 0 ? "Add" : "Edit"}
          onClick={handleEditClick}
          totalBudget={totalBudget}
        />
        <GroupSmallExpenseCard
          icon={AiOutlineShoppingCart}
          label="Total expense"
          value={totalExpense}
        />
        <GroupSmallExpenseCard
          icon={LiaMoneyBillWaveAltSolid}
          label="Remaining budget"
          value={remainingBudget}
        />
      </div>

      {/* container for GroupExpenseBar.jsx and GroupChart.jsx styling */}
      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <div className="flex min-w-0 flex-col gap-5 lg:w-1/2">
          <GroupMembers members={group.members} />
          <ExpenseBar expense={totalExpense} budget={totalBudget} />
        </div>
        <div className="min-w-0 lg:w-1/2">
          {" "}
          {/* groupChart will take the available width */}
          <GroupChart groupId={groupId} />
        </div>
      </div>

      {/* modal to move */}
      {isOpen && (
        <Modal
          title={
            group.totalBudget === 0
              ? "Add budget and expense"
              : "Edit budget and expense"
          }
          content={
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-body font-semibold">Budget:</label>

                <input
                  autoFocus
                  type="number"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="(max 5 numbers)"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-body font-semibold">Expense:</label>

                <input
                  type="number"
                  name="totalExpense"
                  value={formData.totalExpense}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="(max 5 numbers)"
                  required
                />
              </div>

              <button type="submit" className="btnPrimary mt-5 h-10 text-[1.05rem] font-semibold">
                {totalBudget === 0 ? "Add" : "Update"}
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

export default Groups;
