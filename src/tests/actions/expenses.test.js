import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense,
     addExpense, 
     editExpense, 
     startEditExpense,
     removeExpense, 
     startRemoveExpense,
     setExpenses, 
     startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done()); //using done so that the firebase statement actually works before runnnig the test cases
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy(); //since we have removed that expense it shuld not be there
        done();
    });
});

test('should setup edit expense actioon object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id
    const updates = { amount: 21045 };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => { //the previous return statement will be returned here
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
})

test('shuold setup add expense action object with provided values', () => {
    // const expenseData = {
    //     description: 'Rent',
    //     amount: 109500,
    //     createdAt: 1000,
    //     note: 'This was last months rent'
    // }; 

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        // expense: {
        //     ...expenseData,
        //     id: expect.any(String) //watch expect.any in jest docs
        // }                          //as our id generated randomly and dynamically using uuid
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {  //watch video
    const store = createMockStore({}); //this is a mock store where we can dispatch our async operations
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => { //this cde doesnt run until long after the parent function has returned
        // expect(1).toBe(1);
        const actions = store.getActions(); // getActions to get all of the actions that werer dispatched to the mock store. This will return an array f all the actions
        expect(actions[0]).toEqual({ //0; as for now we have only dispatched one action to the mock store
            type: 'ADD_EXPENSE',
            expense: {
                 id: expect.any(String),
                 ...expenseData 
            }
        });

        //this is async so using done inside this
        return database.ref(`expenses/${actions[0].expense.id}`).once('value'); // this promise as an argument t the next then call as it as returned
    }).then((snapshot) => {    //expese is the root inside which firebase stores the data in a unique key which can be expanded
        expect(snapshot.val()).toEqual(expenseData);
        done(); //this will force the jest to wait until this moment of time. As the parent function is asynchronous. We have to wait for firebase
    }); 
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({}); 
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => { 
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({ 
            type: 'ADD_EXPENSE',
            expense: {
                 id: expect.any(String),
                 ...expenseDefaults
                 
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value'); 
    }).then((snapshot) => {    
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); 
    }); 
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type:'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });