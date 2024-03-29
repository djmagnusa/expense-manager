import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/'); //history is passed int this cmoponent because this is registered with a route
    };
    render() {
        return (
        <div>
            <div className="page-header">
                <div className="content-container">
                   <h1 className="page-header__title">Add Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        </div> 
        );
    }
}

// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm 
//             onSubmit={(expense) => {
//                 // console.log(expense);
//                // props.dispatch(addExpense(expense));
//                props.onSubmit(expense); 
//                props.history.push('/'); // it will switch to dashboard using browser routing
//             }}
//         />
//     </div> 
// );

const mapDispatchToProps = (dispatch) => ({ //this is similar to mapStateToProps 
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);