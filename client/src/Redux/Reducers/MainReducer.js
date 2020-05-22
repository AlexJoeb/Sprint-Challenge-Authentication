import {
    FETCH_JOKES_START,
    FETCH_JOKES_SUCCESS,
    FETCH_JOKES_FAIL,
    SET_TOKEN,
    REMOVE_TOKEN
} from '../Actions/MainActions';

const initState = {
    token: null,
    jokes: [],
    loadingJokes: false,
    error: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_JOKES_START:
            return {
                ...state,
                loading: true,
                jokes: [],
                error: null,
            };
        case FETCH_JOKES_SUCCESS:
            return {
                ...state,
                loading: false,
                jokes: action.payload,
                error: null,
            }
        case FETCH_JOKES_FAIL:
            return {
                ...state,
                loading: false,
                jokes: [],
                error: action.payload,
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                token: null,
            }
        default:
            return initState;
    }
}