import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const initialization = (data)=>({
    type: actionTypes.Departmental_structure,
    data:fromJS(data)
})

const inituserlist = (data)=>({
    type: actionTypes.userlist_structure,
    data:fromJS(data)
})

export const getUserByDeptList = (data)=>{
    return (dispatch)=>{
        // var params = new URLSearchParams();
        // params.append('dapeId', data);
        axios.get("/user-api/user/list", {
            params: {
              dapeId: data 
            }
        }).then(function(res){
            dispatch(inituserlist(res.data.data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const InitializationList = ()=>{
    return (dispatch)=>{
        axios.get("/user-api/dept/tree").then(function(res){
            const data = res.data.data;
            dispatch(initialization(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}