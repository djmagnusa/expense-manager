import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
        // console.log('updated', expense)
    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
        
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        );
    }

};

//Route does sends some props by deafult which can be looked into the console. So inside the props there is a match key then params key and then our id
// const EditExpensePage = (props) => {
//     // console.log(props);
//     return (
//         <div>
//             <ExpenseForm
//                 expense={props.expense}
//                 onSubmit={(expense) => {
//                     props.dispatch(editExpense(props.expense.id, expense));
//                     props.history.push('/');
//                     console.log('updated', expense)
//                 }}
//             />

//             <button onClick={() => {
//                 props.dispatch(removeExpense({ id: props.expense.id }));
//                 props.history.push('/');

//             }}>Remove</button>

//         </div>
//     );
// };

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)), 
   startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);