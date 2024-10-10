// for icons, go to this page https://react-icons.github.io/react-icons/ the search for the icon you need. package is already installed, you just need to import the icon, just like the one above, on line 1. on the webpage, when you click on the icon and open it, you will see the code you need to copy paste to import it. to use the icon, you just put it in JSX like its a normal component. follow the <MdGroups/> example below

function GroupSmallExpenseCard({ icon: Icon, label, value, button, onClick }) {
  return (
    <section className="bg-white dark:bg-dark-primary border p-8 mt-8 ml-8 space-x-6  rounded-global
      flex items-start w-custom-card">
      <div className="flex items-start space-x-4 flex-grow">
        <Icon className="bg-blizzard-blue dark:bg-dark-icon-bg rounded-full w-14 h-14 p-3 text-primary dark:text-primary-dark-mode" />
        <span>
          <p className="text-body font-medium text-title dark:text-dark-text-secondary">
            {label}
          </p>
          <p className="text-2xl font-bold text-secondary dark:text-dark-text">
            {value}
          </p>
        </span>
      </div>
      {button && (
        <button
          onClick={onClick}
          className="w-[67px] h-8 py-1 px-3 bg-blizzard-blue hover:bg-primary hover:text-white text-primary
           dark:bg-dark-primary dark:border dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-primary dark:hover:border-primary font-medium rounded-lg text-base ml-auto"
        >
          {button}
        </button>
      )}
    </section>
  );
}

export default GroupSmallExpenseCard;
