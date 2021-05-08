import React from 'react';
import moment from 'moment'; // moment is a great time utility library
import { SingleDatePicker } from 'react-dates'; //react-dates is a calaneder picker tool that happens to require moment
//import 'react-dates/lib/css/_datepicker.css'; 

//const date = new Date();
// const now = moment(); //it represents the curernt point in time
// console.log(now.format('MMM Do, YYYY')); // a comma inside has no special meaning it will be printed in console

export default class ExpenseForm extends React.Component {
   constructor(props) {
       super(props);

        this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount / 100).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calenderFocued: false,
        error: ''
     };
   }

   onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
   };

   onNoteChange = (e) => {
       const note = e.target.value;
    //   e.persist(); // use this if we are doing note: e.target.value else it wont work
       this.setState(() => ({ note }));
   };

   onAmountChange = (e) => {
        const amount = e.target.value;

        //!amount so that we cam make the string empty
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { // watch video for explanation
             this.setState(() => ({ amount }))
        }
   }; 

   onDateChange = (createdAt) => {
       if (createdAt) {  //so that user will not be able to clear the date 
            this.setState(() => ({ createdAt }));
       }
   };

   onFocusChange = ({ focused }) => {  // the argument is passed from singledate picker i.e react-dates library. we can check docs
        this.setState(() => ({ calenderFocused: focused }))
   };
   
   onSubmit = (e) => {
       e.preventDefault();


        if (!this.state.description || !this.state.amount) { //if there no description or amount
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
        this.setState(() => ({ error: '' }));
            //    console.log('submitted!'); 
        this.props.onSubmit({
            description: this.state.description,
            amount: parseFloat(this.state.amount, 10) * 100,
            createdAt: this.state.createdAt.valueOf(),  //to get the timestamp back from the date we are using .value()
            note: this.state.note
          });
        }
   }

    render() {
      return(
        <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    placeholder="Description"
                    autoFocus  //focus on this input when page is loaded
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input 
                   // type="number"
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />

                
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}    // this is going to get called with momnet when someone picks a new day from the calender
                    focused={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false }//By default single date picker does not let you pick dates from the past so tweaking it
                    //this will make every single day available to us
                />

                <textarea
                    placeholder="Add a note for your expense (optional"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <button>Add Expense</button>
            </form>
        </div>
      )
    }
}