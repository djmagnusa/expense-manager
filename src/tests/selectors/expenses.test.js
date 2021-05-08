import moment from 'moment'
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

// const expenses = [{
//     id: '1',
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0
// }, {
//     id: '2',
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     //createdAt: -1000  //minus 1000 miliseconds i.e 1 second in the past
//     createdAt: moment(0).subtract(4, 'days').valueOf()  ///subtract 4 days and getting the value frm the string
// }, {
//     id: '3',
//     description: 'Credit Card',
//     note: '',
//     amount: 4500,
//     //createdAt: 1000
//     createdAt: moment(0).add(4, 'days').valueOf()
// }]

test('should filter by text value', () => {
    const filters = {
        text: 'e',  //two items in array should come back credit card and rent as they have 'e'
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined

    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[1] ]) //first is going to be credit card as we are sorting by date
})

test('should filter by startDate', () => {
    const filters = {
        text: '', 
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined

    }

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2],expenses[0] ])
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days') //adding 2 days means future
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[1]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '', 
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
})