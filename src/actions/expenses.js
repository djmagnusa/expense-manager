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
                                       //we can call getState to get the current state
    return (dispatch, getState) => {  //returning a function here instead of object like others. This is not normal, this is possible cuz of redux-thunk
        const uid = getState().auth.uid;
        const {                       
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData; //this is destructuring. we can define what values to unpack from the variable on the right side
        
        const expense = { description, note, amount, createdAt };
        
       return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => { //then callback with push gets called with a ref (i.e referenece)
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

export const startRemoveExpense = ({ id } = {}) => { //async action hence returning a function
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => { //returning promise
            dispatch(removeExpense({ id }));
        });
    };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({ //prooviding no defaults as, if there is no  id and updates then no need to call it
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => { //if we forget to write return here we wont be able t actually do smething after startEditExpense completes over inside of the test case
            dispatch(editExpense(id, updates));
        });
    };
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {  //snapshot will give us an object structure and we have to make sure to convert that over to an array structure and return will return the promise to app.js file
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(setExpenses(expenses))
        });
    };
};





