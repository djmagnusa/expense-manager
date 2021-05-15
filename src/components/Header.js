import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

//Link avoids full page refresh when the link is clicked. It makes the browser look for client side routing
//NavLink is used for styling active links
export const Header = ({ startLogout }) => ( //exporting unconnected version
    <header className="header">    
        <div className="content-container">
            <div className="header__content">  
                <Link className="header__title" to="/dashboard">
                    <h1>Expense Manager</h1>
                </Link> 
                <button onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header) //exporting connected version