import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const userData = fromJS({
    "tree": [],
    "user": []
})

export default (state = userData,action) =>{
    switch(action.type){
        case actionTypes.Departmental_structure:
            return state.set("tree",action.data);
        case actionTypes.userlist_structure:
            return state.set("user",action.data);
        default:
            return state;
    }
}