export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)  //explicitly returning the array of the amounts of all the expenses
        .reduce((sum, value) => sum + value, 0); //initializing accumlator value with 0
  };
  