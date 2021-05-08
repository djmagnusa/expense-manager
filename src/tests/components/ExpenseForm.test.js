import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm.js';
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {//finding using form tag
        preventDefault: () => {  }      //we have to fake this as we arent passing anything like 'e' which is used in e.preventDefualt();
    }); 
    expect(wrapper.state('error').length).toBeGreaterThan(0)  //check state in enzyme docs
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { //0 means the first input tag in wrapper
        target: { value }
    })  
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'New note value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', { //as onNoteChange is working on a text area
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { //input at 1 (i.e 2) is for amount field
        target: { value }
    })      
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(''); //as according to out code in ExpenseForm.js when an invalid amount in given as input we change the filed to blank
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); //jest.fn returns a new spy 
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {  }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });

    // onSubmitSpy('Andrew', 'Philadelphia');
    // expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia'); //to test if it was ever called
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now); //first finding the SingleDatePicker tag and then looking the prop onDateChnage
    expect(wrapper.state('createdAt')).toEqual(now)
});

test('should set calender focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused }); //the second parentheses is for calling onFocusChange and while calling we are passing focused as an argument
    expect(wrapper.state('calenderFocused')).toBe(focused)
});


