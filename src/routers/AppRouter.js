import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
//import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
//import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

// whenever it matches the path provided it will render the component
// BrowserRouter needs a single root element hence creating div
//BrowserRouter already has history built in. So we are using own router and passing history prop
const AppRouter = () => (
    <Router history={history}> 
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/> 
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />          
                <Route component={NotFoundPage} />
            </Switch>
        </div>
        
    </Router>
);

export default AppRouter

