import { jumpyAnimation } from "../Utils/animations";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// this component is a template for three small cards in the group page that you see at the top. in the first of these cards you see the total budget of the group and a btn to add/edit it.
function GroupSmallExpenseCard({
  icon: Icon,
  label,
  value,
  button,
  onClick,
  totalBudget,
}) {
  const { groupId } = useParams();
  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId)),
  );
  return (
    <section className="flex w-full items-start rounded-global border-global border-border bg-white p-global text-black shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:text-darkBlack dark:shadow-custom-light">
      <div className="flex flex-grow items-start space-x-4">
        <Icon className="h-14 w-14 rounded-full bg-mainBG p-3 text-primary dark:bg-darkmainBG dark:text-darkPrimary" />
        <span>
          <p className="font-body font-medium text-title dark:text-darkTitle">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </span>
      </div>
      {button && (
        <motion.button
          onClick={onClick}
          className={
            group.totalBudget !== 0 ? "btnSecondary ml-3" : "btnPrimary ml-3"
          }
          animate={totalBudget === 0 ? "animate" : "initial"}
          variants={jumpyAnimation}
        >
          {button}
        </motion.button>
      )}
    </section>
  );
}

export default GroupSmallExpenseCard;
