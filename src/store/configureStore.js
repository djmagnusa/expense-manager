import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
    
const store = createStore(
    combineReducers({
        expenses: expensesReducer,  //instead of putting the array on the roof we are creating an object and putting the array on the expenses property
        filters: filtersReducer,
        auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //to make states accessible to redux dev tool
  );

  return store;
};

//Store creation
