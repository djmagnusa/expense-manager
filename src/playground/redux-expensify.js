import { createStore, combineReducers } from 'redux';
//combinedReducers is going to allow us to create multiple functiosn that define how a redux application changes
import { v4 as uuidv4 } from 'uuid';

//ADD_EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({ //prooviding no defaults as, if there is no  id and updates then no need to call it
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = (text='') => ({ //if no text provided then set text to an empty string
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'

});

//SORT_BY_AMOUNT
const  sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE
const setStartDate = (startDate) => ({ //if no start date is passed it will be undefined which is the normal functionality of argumnets
    type: 'SET_START_DATE',
    startDate
});


//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})



//Expenses Reducer

const expensesReducerDefaultState = [];


const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [  //this will not change the state at all
                ...state, 
                action.expense //add action.expense to the current state
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
       
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {

                    return {
                        ...expense, //grabbing all the properties from the existing one
                        ...action.updates //overriding any of the one that are passed down
                    };
                } else {    
                    return expense; //no changes to the expense array
                }
            });
        
        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState , action) => {
    switch (action.type) {

        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text

            }

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }

        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };

        default:
            return state;
    }
};

//timestamps (milliseconds)
// 0 represents January 1st 1970 (unix epoch)
// positive numbers go forward in time while negative goes backwards


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; //as we have to filter the expenses only if it is a number and Start date should be less than create date in order to show the expense
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
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


//Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,  //instead of putting the array on the roof we are creating an object and putting the array on the expenses property
        filters: filtersReducer
    })
);

store.subscribe(() => {
    // console.log(store.getState());
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

//this is going to dispatch too both expenses and filters reducer
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300,  createdAt: -1000}));
//dispatch returns an action object 

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id,  { amount: 500 }));

// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
    expenses: [{
        id: 'pijasdfhwer',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Jen',
//     age: 24
// };

// console.log({
//     age: 27,
//     ...user,
//     location: 'Philadelphia',
// }); 