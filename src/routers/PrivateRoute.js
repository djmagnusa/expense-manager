import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({  //unconnect component
    isAuthenticated, 
    component: Component, //since we are going to render it and we need uppercase for that
    ...rest //when we are destructuring bjects we can use rest operator(...rest) to get a variable called rest with all the tuff we did not destructure
}) => ( 
    <Route {...rest} component={(props) => ( //since component is not passing in the rest operator
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
            
        ) : (
            <Redirect to="/" />
        )
    )} />
);


const mapStateToProps = (state) => ({ //implicitly returning an object
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

