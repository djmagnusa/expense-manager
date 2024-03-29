import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn(); 
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test('should render ExpenseListFilters crrectly', () => {
    expect(wrapper).toMatchSnapshot();

});

test('should render ExpenseListFilters with alt data correctly', () => {
    //setProps is provided by enzyme using which we can manipulate the props for a given component
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: { value }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

test('should sort by date', () => {
   const value = 'date';
    wrapper.setProps({  //as it was already set to date so first changing it to amount
        filters: altFilters
    });

    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled(); //since now it must have been changed to date
});

test('should sort by amount', () => {
    const value = 'amount';

    wrapper.find('select').simulate('change', {
        target: { value }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate }) //passing object in the parameter of onDatesChange
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
    const calenderFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused) //first looking the state of clenderFocused and expecting it to be same as the string calenderFocused that we have defined 
});
