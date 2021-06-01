import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
// import { setTextFilter } from './actions/filters';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
// import './firebase/firebase';
// import './playground/promises'

const store = configureStore();
console.log('test');

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));


// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000)

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
// console.log(visibleExpenses);


//Provider makes the Redux store available to any nested components that have been wrapped in the connect() function.
//It let us provide the store to all of our components
const jsx = (
    <Provider store={store}> 
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {  
    if (!hasRendered){ //to make sure app only renders only once and not all the time
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// store.dispatch(startSetExpenses()).then(() => {
//     ReactDOM.render(jsx, document.getElementById('app'));
// });

firebase.auth().onAuthStateChanged((user) => {
    if(user) { //if there is a user we knw they just logged in
        // console.log('log in');
            // console.log('uid', user.uid) //user.uid stores the user id
            store.dispatch(login(user.uid));
            store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') { //if they just logged in and they are on the login page  
                history.push('/dashboard');
            }
        });
        
    } else {
        // console.log('log out');
        store.dispatch(logout());
        renderApp();
        history.push('/'); //when they log out it will bring them to the login page
    }
});

