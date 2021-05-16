import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';
// import { connect } from 'react-redux';
// import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
        </Link>
);

//since store is passed as a prop to the Provider when we connect it pass the store as an argument
//here we had nothing to do with the state so nt passing the props
// export default connect()(ExpenseListItem);
export default ExpenseListItem;