import moment from 'moment'
import { parseTwoDigitYear } from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () =>{
    const state = filtersReducer(undefined, { type: '@@INIT' }); //@@INIT is the first action dispatched when a page is opened. It is a "randomString"
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'  //doing this as by default the sortBy was already date. So first changing to amount and then again changing it t date for testing
    };

    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
})

test('should set text filter', () => {
    const text = 'This is my filter';
    const action = { 
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
})

test('should set startDate filter', () => {
    const startDate = moment();
    const action = { 
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);  //using toEqual as moment instances are objects
});

test('shuold set endDate filter', () => {
    const endDate = moment();
    const action = { 
        type: 'SET_END_DATE', 
        endDate
    
    };

    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate)
});
