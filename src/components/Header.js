import React from 'react';
import { NavLink } from 'react-router-dom';

//Link avoids full page refresh when the link is clicked. It makes the browser look for client side routing
//NavLink is used for styling active links
const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink> 
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    </header>
);

export default Header