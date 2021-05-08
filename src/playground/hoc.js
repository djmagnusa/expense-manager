// Higher Order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => { //returning a hoc
    return (props) => (
        <div>
            {props.isAdmin &&  <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} /> 
        </div>
    );
};

const requiredAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
                <p>Please login to view the info</p>
            )}
        </div>
    )
};

//...props will take any key-value pairs on that object and passing them down as props 

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requiredAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin = {true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated = {true} info="These are the details" />, document.getElementById('app'));