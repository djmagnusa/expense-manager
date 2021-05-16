import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expenseListItem';
import selectExpenses from '../selectors/expenses';


export const ExpenseList = (props) => ( //exporting like this as we want the unconnected version for testing
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div> 
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No expenses</span>
                </div>
                ) : (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense} />
                    })
                )
            }
        </div>


    </div>
);

//defining the things we want to get off the store
// state is accessible as store is passed as a prop in provided to AppRouter
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

//When we connect a component to the redux store it's reactive which means that as the store changes your component is ging to get re rendered with those new values

export default connect(mapStateToProps)(ExpenseList);
// (ExpenseList); defining the component that we want to create the connected version of 