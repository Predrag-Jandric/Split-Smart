import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { useEffect, useState } from "react";
import { updateMemberContribution } from "../../features/groupsSlice";
import { motion } from "framer-motion";
import { jumpyAnimation } from "../Utils/animations";
import { toast } from "react-toastify";

// chart colors
const COLORS = [
  "#FFCF8C",
  "#8CCFFF",
  "#E4FF8C",
  "#8C8EFF",
  "#DE8CFF",
  "#8CFFE8",
  "#FF8C8C",
  "#8EFF8C",
  "#FF8CC0",
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
      className="text-md text-secondary font-bold"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function GroupChart({ groupId }) {
  const groupIdInt = parseInt(groupId);

  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === groupIdInt),
  );

  const hasMembers = group.members && group.members.length > 0;

  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  const [customContributions, setCustomContributions] = useState({});
  const [remainingPercentage, setRemainingPercentage] = useState(100);

  // set initial contributions when members are present
  useEffect(() => {
    if (hasMembers) {
      const initialContributions = group.members.reduce((acc, member) => {
        acc[member.id] = Math.round(member.contribution) || 0;
        return acc;
      }, {});
      setCustomContributions(initialContributions);
      updateRemainingPercentage(initialContributions);
    }
  }, [group.members, hasMembers]);

  // update remaining percentage when custom contributions change
  const updateRemainingPercentage = (contributions) => {
    const totalContributions = Object.values(contributions).reduce(
      (acc, val) => acc + (parseInt(val) || 0),
      0,
    );
    setRemainingPercentage(Math.round(100 - totalContributions));
  };

  // handle custom contribution change
  const handleContributionChange = (memberId, newContribution) => {
    const newValue = parseInt(newContribution);

    setCustomContributions((prevContributions) => {
      const updatedContributions = {
        ...prevContributions,
        [memberId]: newValue || 0,
      };

      updateRemainingPercentage(updatedContributions);

      return updatedContributions;
    });
  };

  // IMPORTANT FUNCTION. distribute remaining percentage randomly. this is the core logic of the component. it allows that the percentage is always 100%.
  const distributeRemainingPercentage = () => {
    const memberIds = Object.keys(customContributions);
    let remaining = remainingPercentage;

    while (remaining !== 0) {
      const randomIndex = Math.floor(Math.random() * memberIds.length);
      const memberId = memberIds[randomIndex];
      const adjustment = remaining > 0 ? 1 : -1;

      setCustomContributions((prevContributions) => {
        const updatedContributions = {
          ...prevContributions,
          [memberId]: prevContributions[memberId] + adjustment,
        };

        remaining -= adjustment;
        updateRemainingPercentage(updatedContributions);

        return updatedContributions;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (remainingPercentage !== 0) {
      distributeRemainingPercentage();
    }

    dispatch(
      updateMemberContribution({
        groupId: group.id,
        contributions: customContributions,
      }),
    );
    toast.success("Contributions updated!", {
      position: "top-right",
      autoClose: 2000,
    });

    closeModal();
  };

  return (
    <section className="flex h-full flex-col items-center justify-start rounded-global border-global border-border bg-white p-global text-black shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:text-darkBlack dark:shadow-custom-light">
      <div className="flex w-full justify-between">
        <p className="text-secondary text-subheader font-bold">Contributions</p>
        {group.members.length > 0 && (
          <motion.button
            animate={group.members.length > 0 ? "animate" : "initial"}
            variants={jumpyAnimation}
            onClick={openModal}
            className="btnPrimary bounce"
          >
            Edit
          </motion.button>
        )}
      </div>

      {/* modal form for editing contributions. thanks to this, contributions can be CUSTOM*/}
      {isOpen && (
        <Modal
          title="Edit Contributions"
          content={
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col justify-end gap-2 sm:flex-row"
                >
                  <label className="text-body font-semibold sm:mr-auto">
                    {member.name}:
                  </label>

                  {/* wrapper to keep range input and percentage in the same row on all screens */}
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max={remainingPercentage + customContributions[member.id]}
                      step="1"
                      value={customContributions[member.id]}
                      onChange={(e) =>
                        handleContributionChange(member.id, e.target.value)
                      }
                      className="w-[85%] accent-primary transition-all dark:accent-darkPrimary"
                    />
                    <span className="text-body font-semibold sm:w-[3rem] sm:text-right">
                      {customContributions[member.id]} %
                    </span>
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className={`btnPrimary mt-5 flex h-10 text-[1.05rem] font-semibold ${
                  remainingPercentage !== 0
                    ? "cursor-not-allowed border-alert bg-alert font-semibold hover:border-alert hover:bg-alert dark:border-alert dark:bg-alert dark:hover:border-alert dark:hover:bg-alert"
                    : "cursor-pointer"
                }`}
                disabled={remainingPercentage !== 0}
              >
                <div className="flex w-full items-center justify-center gap-1">
                  {remainingPercentage !== 0 ? (
                    <>
                      <span>Distribute Remaining</span>
                      <span className="inline-block w-[3rem] text-center">
                        {remainingPercentage}%
                      </span>
                    </>
                  ) : (
                    <span>Update Contributions</span>
                  )}
                </div>
              </button>
            </form>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}

      {/* if there are members, then display the chart wheel */}
      {hasMembers ? (
        <>
          <PieChart className="my-6" width={250} height={250}>
            <Pie
              data={group.members.map((member) => ({
                name: member.name,
                value: member.contribution > 0 ? member.contribution : 0,
              }))}
              cx={120}
              cy={120}
              innerRadius={35.5}
              outerRadius={120}
              fill="#000"
              paddingAngle={0}
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

          {/* legend under the chart wheel, who paid and how much */}
          <article className="mt-auto flex w-full flex-wrap justify-start gap-8 rounded-global border-global border-border bg-legendBG p-global shadow-custom-dark dark:border-darkBorder dark:bg-darklegendBG dark:shadow-custom-light">
            {group.members.map((member, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="size-4 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="ml-2 text-legendSize font-semibold dark:text-darkLegend">
                  {member.name}
                </span>
                <span className="ml-1 text-legendSize font-bold dark:text-darkLegend">
                  {" "}
                  -{" "}
                  {(group.totalExpense * (member.contribution / 100)).toFixed(
                    0,
                  )}{" "}💸
                </span>
              </div>
            ))}
          </article>
        </>
      ) : (
        <p className="text-md my-16 font-semibold">
          {group.totalBudget === 0 ? "Add total budget" : "Add group member"}
        </p>
      )}
    </section>
  );
}
