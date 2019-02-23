import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const typesData = fromJS({
    "list": []
})

export default (state = typesData,action) =>{
    switch(action.type){
        case actionTypes.TYPESLIST_DATA:
            return state.set("list",action.data);
        default:
            return state;
    }
}