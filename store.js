import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const InitialState = {
    account: {},
    initsLoaded: false
};

export const actionTypes = {
    SET_ACCOUNT: "SET_ACCOUNT",
    SET_INITSLOADED: "SET_INITSLOADED"
};

// REDUCERS
export const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACCOUNT:
            return Object.assign({}, state, {
                account: action.account
            });
        case actionTypes.SET_INITSLOADED:
            return Object.assign({}, state, {
                initsLoaded: action.initsLoaded
            });
        default:
            return state;
    }
};

// ACTIONS
export const setAccount = account => dispatch => {
    return dispatch({
        type: actionTypes.SET_ACCOUNT,
        account: account
    });
};

export const setInitLoaded = initsLoaded => dispatch => {
    return dispatch({
        type: actionTypes.SET_INITSLOADED,
        initsLoaded: initsLoaded
    });
};

export function initializeStore(initialState = InitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
}
