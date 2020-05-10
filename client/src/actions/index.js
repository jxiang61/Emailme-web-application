import axios from 'axios';
import {FETCH_USER} from "./types";

export const fetchUser = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/current_user');

        dispatch({type:FETCH_USER, payload: response.data});
    };
};

export const handleToken = (token) => {
    return async (dispatch) => {
        //use the token after payment to update user's info
        const res = await axios.post('/api/stripe', token);

        dispatch({type:FETCH_USER, payload: res.data});
    }
}

