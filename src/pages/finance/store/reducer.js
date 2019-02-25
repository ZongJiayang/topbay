import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const userData = fromJS({
    "account": {},
    "changelist":[]
})

export default (state = userData,action) =>{
    switch(action.type){
        case actionTypes.GET_MY_ACCOUNT:
            return state.set("account",action.data);
        case actionTypes.GET_CHANGE_LIST:
            return state.set("changelist",action.data);
        default:
            return state;
    }
}