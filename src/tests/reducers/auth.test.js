 import authReducer from '../../reducers/auth';

 test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abc123'
    };
    const state = authReducer({}, action); //first argument is state
    expect(state.uid).toBe(action.uid);
 });

 test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'anything' }, action)
    expect(state).toEqual({}) //uid should not be there
});