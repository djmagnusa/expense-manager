import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

//Link avoids full page refresh when the link is clicked. It makes the browser look for client side routing
//NavLink is used for styling active links
export const Header = ({ startLogout }) => ( //exporting unconnected version
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink> 
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header) //exporting connected version