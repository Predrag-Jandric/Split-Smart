// for icons, go to this page https://react-icons.github.io/react-icons/ the search for the icon you need. package is already installed, you just need to import the icon, just like the one above, on line 1. on the webpage, when you click on the icon and open it, you will see the code you need to copy paste to import it. to use the icon, you just put it in JSX like its a normal component. follow the <MdGroups/> example below

import { jumpyAnimation } from "../Utils/animations";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
    state.groups.groups.find((group) => group.id === parseInt(groupId))
  );
  return (
    <section
      className="bg-white w-full border-global border-border p-global rounded-global
      flex items-start shadow-custom-dark"
    >
      <div className="flex items-start space-x-4 flex-grow">
        <Icon className="bg-mainBG rounded-full w-14 h-14 p-3 text-primary" />
        <span>
          <p className="font-body font-medium text-title">{label}</p>
          <p className="text-2xl font-bold text-secondary">{value}</p>
        </span>
      </div>
      {button && (
        <motion.button
          onClick={onClick}
          className={group.totalBudget !== 0 ? "btnSecondary" : "btnPrimary"}
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
