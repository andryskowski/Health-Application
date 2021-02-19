import { act } from 'react-dom/test-utils'
import {
    ADD, EDIT, DELETE
} from '../actions/appActions'

export const appReducer = (state = [], action) => {
    switch(action.type) {
        case ADD:
            return [...state, action.payload];
        case EDIT:
            return;
        case DELETE:
            return;
        
        default:
        console.warn(`No action type: ${action.type}`);
        return state;

    }
    };

