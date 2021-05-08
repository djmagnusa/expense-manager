import moment from 'moment'

// Get visible expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
       // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; //as we have to filter the expenses only if it is a number and Start date should be less than create date in order to show the expense
       // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
       const createdAtMoment = moment(expense.createdAt);
       const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
       const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
       const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch; //if all of them are true only then it will be returned
    }).sort((a, b) => {   //check array sort comparable function in mdn
        if(sortBy === 'date') {   //if greater than 0 b will come first and if less than 0, a will come first
            return a.createdAt < b.createdAt ? 1 : -1; //if it is 1 then b will come first else a will come first
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
