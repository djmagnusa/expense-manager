import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expenseListItem';
import selectExpenses from '../selectors/expenses';


export const ExpenseList = (props) => ( //exporting like this as we want the unconnected version for testing
    <div>
        {
            props.expenses.length === 0 ? (
              <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }

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