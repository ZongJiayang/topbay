import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const initialization = (data)=>({
    type: actionTypes.INITALIZATION_DATA,
    data:fromJS(data)
})

export const getMenusList = ()=>{
    return (dispatch)=>{
        axios.get('/api/menus.json').then(function (response){
            const data = response.data;
            dispatch(initialization(data.data))
        }).catch(function(error){
            console.log(error);
        });
    }
}

