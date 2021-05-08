import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
    // expense: {
    //     id: uuid(),
    //     description,
    //     note,
    //     amount,
    //     createdAt
    // }
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {  //returning a function here instead of object like others. This is not normal, this is possible cuz of redux-thunk
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData; //this is destructuring. we can define what values to unpack from the variable on the right side
        
        const expense = { description, note, amount, createdAt };
        
       return database.ref('expenses').push(expense).then((ref) => { //then callback with push gets called with a ref (i.e referenece)
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({ //prooviding no defaults as, if there is no  id and updates then no need to call it
    type: 'EDIT_EXPENSE',
    id,
    updates
});


