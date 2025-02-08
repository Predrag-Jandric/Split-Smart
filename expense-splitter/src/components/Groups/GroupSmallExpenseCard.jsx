// for icons, go to this page https://react-icons.github.io/react-icons/ the search for the icon you need. package is already installed, you just need to import the icon, just like the one above, on line 1. on the webpage, when you click on the icon and open it, you will see the code you need to copy paste to import it. to use the icon, you just put it in JSX like its a normal component. follow the <MdGroups/> example below

import { jumpyAnimation } from "../Utils/animations";
import { motion } from "framer-motion";

function GroupSmallExpenseCard({
  icon: Icon,
  label,
  value,
  button,
  onClick,
  totalBudget,
}) {
  return (
    <section
      className="bg-white border p-8 mt-8 ml-8 space-x-6 rounded-global
      flex items-start shadow-custom-dark w-custom-card"
    >
      <div className="flex items-start space-x-4 flex-grow">
        <Icon className="bg-blizzard-blue rounded-full w-14 h-14 p-3 text-primary" />
        <span>
          <p className="text-body font-medium text-title">{label}</p>
          <p className="text-2xl font-bold text-secondary">{value}</p>
        </span>
      </div>
      {button && (
        <motion.button
          onClick={onClick}
          className={`w-[67px] shadow-custom-dark h-8 py-1 px-3 bg-blizzard-blue hover:bg-primary hover:text-white text-primary font-medium rounded-global text-base ml-auto `}
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
