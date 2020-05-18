import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY, FETCH_SURVEY} from "./types";
import history from "../history";

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

export const submitSurvey = (values, history) => {
    return async (dispatch) => {
        //post data to backend
        //in backend, we defined the same route
        //in this way, we connect frontend with backend
        const res = await axios.post('/api/surveys', values);

        //after this action is executed, navigate to this history page
        history.push('/surveys');

        dispatch({type: FETCH_USER, payload: res.data})
    }
};

export const fetchSurveys = () => {
    return async (dispatch) => {
        //in backend, we user res.send({}) to frontend
        //here, we use axios.get() to receive the response.
        const res = await axios.get('/api/surveys');

        //console.log(res.data)
        dispatch({type: FETCH_SURVEYS, payload: res.data});
    }
};

export const deleteSurvey = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/surveys/delete/${id}`);

        dispatch({type: DELETE_SURVEY, payload: id});

        history.push('/surveys')

    }
};

export const fetchSurvey = (id) => {
    return async (dispatch) => {
        const res = await axios.get(`/api/survey/${id}`);

        dispatch({type: FETCH_SURVEY, payload: res.data});
    }
}

