import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const userData = fromJS({
    "list": []
})

export default (state = userData,action) =>{
    switch(action.type){
        case actionTypes.SAVEUSER_DATA:
            return state.set("list",action.data);
        default:
            return state;
    }
}