import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state= {
        calenderFocued: null
    };

    onDatesChange = ({ startDate, endDate }) => {  //this method is going to get called by the react-dates library. It's gonna get called with an object and on that object we going to ahve as start date and an end date
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }))
    }

   onTextChange = (e) => {
        this.props.setTextFilter(e.target.value); //every single we hit a key stroke it's gonna added onto the end of the input field and that string will be sent as an argument to setTextFitler and that particular expense will be rendered to the screen 
    } 

   onSortChange = (e) => {
    if(e.target.value === 'date'){
         this.props.sortByDate();
    } else if(e.target.value = 'amount') {
         this.props.sortByAmount();
    }
};

    render() {
        return (
                <div className="content-container">
                    <div className="input-group">
                        <div className="input-group__item">
                            <input 
                              type="text"
                              className="text-input" 
                              placeholder="Search expenses"
                              value={this.props.filters.text} 
                              onChange={this.onTextChange} 
                            /> 
                        </div>
                        <div className="input-group__item">
                            <select 
                              className="select"
                              value={this.props.filters.sortBy}
                              onChange={this.onSortChange}
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                            </select>
                        </div>

                        <div className="input-group__item">
                            <DateRangePicker
                                startDate={this.props.filters.startDate}
                                endDate={this.props.filters.endDate}
                                onDatesChange={this.onDatesChange}
                                focusedInput={this.state.calenderFocused}
                                onFocusChange={this.onFocusChange} //watch documentation for this
                                showClearDates={true} //to see the cross button which lets you clear the dates
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                           />
                        </div>
                    </div>
                </div>
         );
     }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({ 
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);