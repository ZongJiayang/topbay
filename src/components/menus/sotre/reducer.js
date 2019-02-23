import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const emenus = fromJS({
    "list": []
})

export default (state = emenus,action) =>{
    switch(action.type){
        case actionTypes.INITALIZATION_DATA:
            return state.set("list",action.data);
        default:
            return state;
    }
}