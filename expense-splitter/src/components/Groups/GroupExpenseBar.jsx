export default function ExpenseBar({ expense, budget }) {
  const expensePercentage = (expense / budget) * 100;

  return (
    <section className="flex h-auto w-full min-w-0 flex-col justify-between rounded-global border-global border-border bg-white p-global text-black shadow-custom-dark dark:border-darkBorder dark:bg-darkWhite dark:text-darkBlack dark:shadow-custom-light">
      <p className="text-subheader font-bold">Expense vs budget</p>

      <div className="flex flex-col items-start justify-between gap-7 md:flex-row lg:flex-col">
        <article className="w-full pr-4">
          {/* progress bar */}
          <div className="relative mb-2 mt-4 h-8 rounded-global bg-progressBar dark:bg-darkprogressBar">
            <p
              className="absolute left-0 top-0 h-full rounded-global bg-primary/60 transition-all duration-500 ease-out dark:bg-darkPrimary/70"
              style={{ width: `${expensePercentage}%` }}
            ></p>
            {/* TIP dividing the budget from expense colors */}
            <p
              className="absolute top-0 h-full bg-mainBG transition-all duration-500 ease-out dark:bg-darkmainBG"
              style={{
                width: "6px",
                left: `calc(${expensePercentage}%)`,
              }}
            ></p>
          </div>
          {/* numbers under the progress bar */}
          <div className="relative flex justify-between text-subheader font-bold">
            <p
              // this style here ensures that the numbers do not ovelap in certain use cases when expense is too high or too low
              style={{
                left:
                  expensePercentage < 20
                    ? "0.5rem"
                    : expensePercentage > 70
                      ? "calc(70% - 4.5rem)"
                      : `calc(${expensePercentage}% - 3rem)`,
              }}
              className="absolute transition-all duration-500 ease-out"
            >
              {expense} $
            </p>
            <p className="ml-auto">{budget} $</p>
          </div>
        </article>

        {/* legend under the progress bar, telling the user what color represents what */}
        <article className="flex w-full flex-col items-start gap-4 rounded-global border-global border-border bg-legendBG p-global text-xs font-bold shadow-custom-dark dark:border-darkBorder dark:bg-darklegendBG dark:shadow-custom-light md:w-56 lg:w-full">
          <div className="flex items-center">
            <span className="mr-2 size-4 rounded-full bg-primary dark:bg-darkPrimary"></span>
            <span className="text-legendSize font-semibold dark:text-darkLegend">
              Expense
            </span>
          </div>
          <div className="flex items-center">
            <span className="dark mr-2 size-4 rounded-full bg-progressBar dark:bg-darkprogressBar"></span>

            <span className="text-legendSize font-semibold dark:text-darkLegend">
              Remaining budget
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
