import { createStore } from 'redux';

// Action generators - functions that return action objects

// const add = ({ a, b }, c) => {
//     return a + b + c;
// };

// console.log(add({ a: 1, b: 12}, 100));


//here setting default object as if the function passes no arguments it will be an empty object rather than undefined by which we wont run int any errors 
const incrementCount = ({ incrementBy = 1 } = {}) => ({  //if incrementBy does not exist use 1 
    type: 'INCREMENT', 
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({  //as we are setting and forcing the user to set count therefore not using a default value
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
});


// Reducers
// 1. Reducers are pure functions which means utput is only determined by input
// 2. Never change state or action we are just reading out of those two


let result;
const add = (a, b) => {
    result = a+b;
};

const countReducer = (state = { count: 0 }, action) => { //state = {} is the default state object when n state is provided

switch (action.type) {
    case 'INCREMENT':
        //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;//if it is a number increment the value by 5 if not then increment by 1
        return { //it's abad habit to change the existing state. So we are using that state using that making a new state and updating it
            // count: state.count + incrementBy
            count: state.count + action.incrementBy
        };

    case 'DECREMENT':
       // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
        return {
                count: state.count - action.decrementBy
            };
    
    case 'SET': 
        return{
            count: action.count
        }

    case 'RESET':
        return {
            count: 0
        }

    default:    
        return state;
}

}


const store = createStore(countReducer);

// Action - nothing mre than an object that gets sent to the store


//The return value from subscribe is actually a function which we can use to unsubscribe
const unsubscribe = store.subscribe(() => { //this function gets called every single time the store changes     
    console.log(store.getState()); //returns the current state object
})

// store.dispatch({ //when we use dispatch createStore runs again
//     type: 'INCREMENT', //caps is just a convention nt necessary
//     incrementBy: 5
// }); //dispatch allows us to send off an action object

store.dispatch(incrementCount({ incrementBy: 5 }));

//unsubscribe(); //now we wont track changes for the next three times

// store.dispatch({
//     type: 'INCREMENT',
// });

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -100 }));
