import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const userData = fromJS({
    "typelist": [],
    "ordinarylist":[],
})

export default (state = userData,action) =>{
    switch(action.type){
        case actionTypes.GETTYPES_DATA:
            return state.set("typelist",action.data);
        case actionTypes.ORDINARYCOST_LIST:
            return state.set("ordinarylist",action.data)
        default:
            return state;
    }
}