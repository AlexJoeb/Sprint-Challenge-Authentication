import axios from 'axios';

export const FETCH_JOKES_START = 'FETCH_JOKES_START';
export const FETCH_JOKES_SUCCESS = 'FETCH_JOKES_SUCCESS';
export const FETCH_JOKES_FAIL = 'FETCH_JOKES_FAIL';
 
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const fetchJokes = () => (dispatch, getState) => {
    dispatch({ type: FETCH_JOKES_START });
    axios.get(`http://localhost:3300/api/jokes`, {
        headers: {
            Authorization: getState().token,
        }
    })
        .then(({ data }) => {
            console.log(data);
            dispatch({ type: FETCH_JOKES_SUCCESS, payload: data });
        }).catch(err => {
            console.error(err.message);
            dispatch({ type: FETCH_JOKES_FAIL, payload: err.message });
        })
} 

export const setToken = token => (dispatch, getState) => {
    dispatch({ type: SET_TOKEN, payload: token });
}

export const removeToken = () => (dispatch, getState) => {
    dispatch({ type: REMOVE_TOKEN });
}