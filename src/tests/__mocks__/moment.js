//this is mocked moment so cant use import moment
const moment = require.requireActual('moment'); //this is going t require the original module, nt the mocked one

export default (timestamp = 0) => {
    return moment(timestamp);
};