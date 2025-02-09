import { PieChart, Pie, Cell } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Utils/Modal";
import useModal from "../Utils/useModal";
import { useEffect, useState } from "react";
import { updateMemberContribution } from "../../features/groupsSlice";

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
        acc[member.id] = 0;
        return acc;
      }, {});
      setCustomContributions(initialContributions);
      setRemainingPercentage(100);
    }
  }, [group.members, hasMembers]);

  const handleContributionChange = (memberId, newContribution) => {
    const newValue = parseFloat(newContribution);

    setCustomContributions((prevContributions) => {
      const updatedContributions = {
        ...prevContributions,
        [memberId]: newValue || 0,
      };

      // Calculate remaining percentage
      const totalContributions = Object.values(updatedContributions).reduce(
        (acc, val) => acc + (parseFloat(val) || 0),
        0
      );
      setRemainingPercentage(
        Math.round((100 - totalContributions) * 100) / 100
      );

      return updatedContributions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled and total equals 100%
    const totalContributions = Object.values(customContributions).reduce(
      (acc, val) => acc + (parseFloat(val) || 0),
      0
    );

    if (totalContributions !== 100) {
      alert("Total contributions must equal 100%");
      return;
    }

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
      className="flex flex-col items-center justify-center bg-white
     p-6 rounded-global shadow-custom-dark"
    >
      <div className="w-full flex items-stretch justify-end">
        <p className="text-subheader mr-auto font-bold text-secondary">
          Budget Split
        </p>
        {hasMembers && (
          <button
            className="px-3 shadow-custom-dark transition rounded-global text-primary bg-blizzard-blue hover:bg-primary hover:text-white  font-medium"
            onClick={openModal}
          >
            Edit Contributions
          </button>
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
                    {member.name} Contribution
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
                      {customContributions[member.id]} %
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-md">
                Percentage left to divide: {remainingPercentage}%
              </p>
              <button
                type="submit"
                className="rounded-global shadow-custom-dark px-4 py-2 bg-blizzard-blue
                 hover:bg-primary hover:text-white text-primary"
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
              fill="#8884d8"
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

          <article className="p-3 w-full flex rounded-global shadow-custom-dark flex-wrap justify-start gap-2">
            {group.members.map((member, index) => (
              <div key={index} className="flex my-2 items-center mx-2  p-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="ml-2 font-bold text-legend">
                  {member.name}
                </span>
                <span className="text-sm ml-1 text-secondary">
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
