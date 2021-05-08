//SET_TEXT_FILTER
export const setTextFilter = (text='') => ({ //if no text provided then set text to an empty string
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'

});

//SORT_BY_AMOUNT
export const  sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE
export const setStartDate = (startDate) => ({ //if no start date is passed it will be undefined which is the normal functionality of argumnets
    type: 'SET_START_DATE',
    startDate
});


//SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})