import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const inittypes = (data)=>({
    type: actionTypes.TYPESLIST_DATA,
    data:fromJS(data)
})

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

export const saveTypes = (data)=>{
    return (dispatch)=>{

        var params = new URLSearchParams();
        params.append('name', data.name);
        params.append('type', data.type);
        params.append('ramark', data.ramark);

        axios.post("/invoices-api/types/",params).then(function(res){
            const code = res.data.resp_code;
            if(code === 200){
                dispatch(getTypeList(-1));
            }
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const deleteType = (data)=>{
    return (dispatch)=>{
        const urls = "/invoices-api/types/"+data;
        axios.delete(urls).then(function(res){
            const code = res.data.resp_code;
            if(code === 200){
                dispatch(getTypeList(-1));
            }
        }).catch(function(error){
            console.log(error);
        });
    }
}

