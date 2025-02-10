import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { useEffect, useState } from "react";
import { updateMemberContribution } from "../../features/groupsSlice";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../Utils/animations";

// chart
const COLORS = [
  "#63C7B2",
  "#FF9F1C",
  "#A0E9FF",
  "#EEAAC6",
  "#6EA5D8",
  "#FFD166",
  "#D08BB9",
  "#B6E37A",
  "#C57B57",
  "#e5f0d0",
];

// props of numbers inside chart position and radius related
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    // props of numbers inside chart styling related
    <text
      x={x}
      y={y}
      fill="#1f1d1b"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-md font-bold text-secondary"
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

function GroupChart({ groupId }) {
  const groupIdInt = parseInt(groupId);

  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === groupIdInt)
  );

  const hasMembers = group.members && group.members.length > 0;

  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  const [customContributions, setCustomContributions] = useState({});
  const [remainingPercentage, setRemainingPercentage] = useState(100);

  useEffect(() => {
    if (hasMembers) {
      // Initialize contributions as empty fields
      const initialContributions = group.members.reduce((acc, member) => {
        acc[member.id] = member.contribution || 0;
        return acc;
      }, {});
      setCustomContributions(initialContributions);
      updateRemainingPercentage(initialContributions);
    }
  }, [group.members, hasMembers]);

  const updateRemainingPercentage = (contributions) => {
    const totalContributions = Object.values(contributions).reduce(
      (acc, val) => acc + (parseFloat(val) || 0),
      0
    );
    setRemainingPercentage(Math.round((100 - totalContributions) * 100) / 100);
  };

  const handleContributionChange = (memberId, newContribution) => {
    const newValue = parseFloat(newContribution);

    setCustomContributions((prevContributions) => {
      const updatedContributions = {
        ...prevContributions,
        [memberId]: newValue || 0,
      };

      updateRemainingPercentage(updatedContributions);

      return updatedContributions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateMemberContribution({
        groupId: group.id,
        contributions: customContributions,
      })
    );
    closeModal();
  };

  return (
    <section
      className="flex flex-col items-center justify-start dark:bg-darkWhite bg-white
     p-global rounded-global shadow-custom-dark dark:shadow-custom-light border-global border-border h-full dark:border-darkBorder text-black dark:text-darkBlack"
    >
      <div className="flex w-full justify-between">
        <p className="text-subheader font-bold text-secondary">Contributions</p>
        {group.members.length > 0 && (
          <motion.button
            animate={group.members.length > 0 ? "animate" : "initial"}
            variants={jumpyAnimation}
            onClick={openModal}
            className="btnPrimary"
          >
            Edit
          </motion.button>
        )}
      </div>

      {isOpen && (
        <Modal
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-[152px_auto] items-center"
                >
                  <label className="text-body">
                    {member.name}&apos;s Contribution
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max={remainingPercentage + customContributions[member.id]}
                      step="1"
                      value={customContributions[member.id]}
                      onChange={(e) =>
                        handleContributionChange(member.id, e.target.value)
                      }
                      className="mr-3 w-[10rem]"
                      required
                    />
                    <span className="text-body">
                      {customContributions[member.id].toFixed(0)} %
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-md">
                Percentage left to divide: {Math.round(remainingPercentage)}%
              </p>
              <button
                type="submit"
                className="btnPrimary h-12 cursor-pointer"
                disabled={remainingPercentage !== 0}
              >
                Update Contributions
              </button>
            </form>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}

      {hasMembers ? (
        <>
          <PieChart className="my-6" width={250} height={250}>
            <Pie
              data={group.members.map((member) => ({
                name: member.name,
                value: member.contribution > 0 ? member.contribution : 0, // Ensure minimum 1% for display
              }))}
              cx={120}
              cy={120}
              innerRadius={35.5}
              outerRadius={120}
              fill="#ff0"
              paddingAngle={1}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {group.members.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <article className="mt-auto p-global w-full border-global dark:border-darkBorder border-border  shadow-custom-dark bg-legendBG dark:bg-darklegendBG flex rounded-global dark:shadow-custom-light flex-wrap justify-start gap-8">
            {group.members.map((member, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="size-4 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="ml-2 font-semibold text-legendSize dark:text-darkLegend ">
                  {member.name}
                </span>
                <span className="ml-1 text-legendSize">
                  {" "}
                  -{" "}
                  {(group.totalExpense * (member.contribution / 100)).toFixed(
                    0
                  )}{" "}
                  $
                </span>
              </div>
            ))}
          </article>
        </>
      ) : (
        <p className="text-lg my-8 font-bold text-secondary">
          Add members to see the chart
        </p>
      )}
    </section>
  );
}

export default GroupChart;
