const ExpenseBar = ({ expense, budget }) => {
  const expensePercentage = (expense / budget) * 100;

  return (
    <section
      className="flex p-global flex-col justify-between w-full  min-w-0 h-auto rounded-global
     bg-white dark:bg-darkWhite border-global text-black dark:text-darkBlack dark:border-darkBorder border-border shadow-custom-dark dark:shadow-custom-light overflow-hidden"
    >
      <p className="text-subheader font-bold">
        Expense vs budget
      </p>

      <div className="flex flex-col gap-7 md:flex-row lg:flex-col justify-between items-start">
        <article className="pr-4 w-full">
          {/* progress bar */}
          <div className="relative h-8 rounded-global 
           
          dark:bg-darkprogressBar
           bg-progressBar mb-2 mt-4 overflow-hidden">
            <p
              className="absolute left-0 top-0 dark:bg-darkPrimary bg-primary h-full transition-all duration-500 ease-out rounded-global"
              style={{ width: `${expensePercentage}%` }}
            ></p>
            {/* white tip in front of primary movable bar */}
            <p
              className="absolute top-0 bg-mainBG dark:bg-darkmainBG h-full transition-all duration-500 ease-out"
              style={{
                width: "6px", // width of the white tip in front of primary bar
                left: `calc(${expensePercentage}% - 2px)`, //the white tip moves with the progress
              }}
            ></p>
          </div>
          {/* numbers */}
          <div className="flex justify-between text-subheader font-bold relative">
            <p
              style={{
                left:
                  expensePercentage > 70
                    ? "calc(70% - 4.5rem)" // Stop at 70% to avoid overlapping with budget figure
                    : `calc(${expensePercentage}% - 3rem)`,
              }}
              className="absolute transition-all duration-500 ease-out"
            >
              {expense} $
            </p>
            <p className="ml-auto">{budget} $</p>
          </div>
        </article>

        {/* legend */}
        <article className="flex flex-col bg-legendBG dark:bg-darklegendBG dark:border-darkBorder border-global border-border dark:shadow-custom-light shadow-custom-dark items-start p-global text-xs font-bold gap-4 w-full md:w-56 lg:w-full rounded-global">
          <div className="flex items-center">
            <span className="size-4 rounded-full dark:bg-darkPrimary bg-primary mr-2"></span>
            <span className="font-semibold dark:text-darkLegend text-legendSize">Expense</span>
          </div>
          <div className="flex items-center">
            <span className="size-4 rounded-full dark:bg-darkprogressBar bg-progressBar dark mr-2"></span>

            <span className="text-legendSize font-semibold dark:text-darkLegend">Remaining budget</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ExpenseBar;
