import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const inittypes = (data)=>({
    type: actionTypes.GETTYPES_DATA,
    data:fromJS(data)
})

const initordinarycost = (data)=>({
    type: actionTypes.ORDINARYCOST_LIST,
    data: fromJS(data)
})

export const getordinarycostList = ()=>{
    return (dispatch)=>{
        var params = new URLSearchParams();

        axios.post("/invoices-api/ordinarycost/list",params).then(function(res){
            const data = res.data.data;
            dispatch(initordinarycost(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const getTypeList = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        params.append('type', data);

        axios.post("/invoices-api/types/list",params).then(function(res){
            const data = res.data.data;
            dispatch(inittypes(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}