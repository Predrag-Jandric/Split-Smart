const ExpenseBar = ({ expense, budget }) => {
  const expensePercentage = (expense / budget) * 100;

  return (
    <section
      className="flex p-global flex-col justify-between w-full  min-w-0 h-auto rounded-global
     bg-white shadow-custom-dark overflow-hidden"
    >
      <p className="text-subheader font-bold text-secondary">
        Expense vs budget
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start">
        <article className="pr-4  min-w-0">
          {/* progress bar */}
          <div className="relative w-full h-8 rounded-global bg-gray-200 mb-2 mt-4 overflow-hidden">
            <p
              className="absolute left-0 top-0 bg-primary h-full transition-all duration-500 ease-out rounded-global"
              style={{ width: `${expensePercentage}%` }}
            ></p>
            {/* white tip in front of primary movable bar */}
            <p
              className="absolute top-0 bg-white h-full transition-all duration-500 ease-out"
              style={{
                width: "4px", // width of the white tip in front of primary bar
                left: `calc(${expensePercentage}% - 2px)`, //the white tip moves with the progress
              }}
            ></p>
          </div>
          {/* numbers */}
          <div className="flex justify-between text-subheader font-bold text-secondary relative">
            <p
              style={{
                left:
                  expensePercentage > 70
                    ? "calc(70% - 13px)" // Stop at 70% to avoid overlapping with budget figure
                    : `calc(${expensePercentage}% - 13px)`,
              }}
              className="absolute transition-all duration-500 ease-out"
            >
              {expense} $
            </p>
            <p className="ml-auto">{budget} $</p>
          </div>
        </article>

        {/* legend */}
        <article className="flex flex-col items-start text-xs font-bold space-y-2 w-full md:w-44 rounded-global bg-white">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
            <span className="font-bold text-legend">Expense</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-300 mr-2"></span>

            <span className="text-legend font-bold">Remaining budget</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ExpenseBar;
