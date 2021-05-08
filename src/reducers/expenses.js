const expensesReducerDefaultState = [];


export default (state = expensesReducerDefaultState, action) => {
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