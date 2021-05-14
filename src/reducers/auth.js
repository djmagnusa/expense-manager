export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { //returning the new state
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};