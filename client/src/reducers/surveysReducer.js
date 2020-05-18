import {FETCH_SURVEYS, DELETE_SURVEY} from "../actions/types";
import _ from 'lodash';

export default function (state=[], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case DELETE_SURVEY:
            // here, action.payload is 'id' only. see actions.js
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
