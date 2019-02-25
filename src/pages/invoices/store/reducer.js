import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const userData = fromJS({
    "typelist": [],
    "ordinarylist":[],
    "costtype":[],
    "subList":[]
})

export default (state = userData,action) =>{
    switch(action.type){
        case actionTypes.GETTYPES_DATA:
            return state.set("typelist",action.data);
        case actionTypes.ORDINARYCOST_LIST:
            return state.set("ordinarylist",action.data);
        case actionTypes.DOCUMENT_TEMPLATE:
            return state.set("costtype",action.data);
        case actionTypes.ADD_SUBLIST:
            const newSubList = state.get("subList").push(action.data);
            return state.set("subList",newSubList);
        default:
            return state;
    }
}