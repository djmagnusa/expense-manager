import moment from 'moment'

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    //createdAt: -1000  //minus 1000 miliseconds i.e 1 second in the past
    createdAt: moment(0).subtract(4, 'days').valueOf()  ///subtract 4 days and getting the value frm the string
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    //createdAt: 1000
    createdAt: moment(0).add(4, 'days').valueOf()
}]
