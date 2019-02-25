import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const getMyAccountAction = (data)=>({
    type: actionTypes.GET_MY_ACCOUNT,
    data:fromJS(data)
})

const getChangeListAction = (data)=>({
    type: actionTypes.GET_CHANGE_LIST,
    data:fromJS(data)
})

export const getMyAccount = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        params.append("userId",data)
        
        axios.get("/finance-api/account/"+data).then(function(res){
            const data = res.data.data;
            dispatch(getMyAccountAction(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const getChangeList = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        params.append("userId",data)
        
        axios.post("/finance-api/account/journal/list",params).then(function(res){
            const data = res.data.data;
            dispatch(getChangeListAction(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}