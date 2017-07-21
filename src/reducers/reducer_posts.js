import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';

export default function(state={}, action) {
    switch (action.type) {
        case DELETE_POST:
            // return a new object with the attribute with the key
            // action.payload.id not present anymore
            return _.omit(state, action.payload);
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = [post]
            // return newState;

            return { ...state, [action.payload.data.id]: action.payload.data }
            // the square brackets DO NOT mean list.  In this context it means
            // make a new key of action.payload.data.id and set its value to
            // action.payload.data
        case FETCH_POSTS:
            // convert the list of posts into an object of posts, with
            // each post having its own id as its key
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state
    }
}