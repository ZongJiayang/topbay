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

const documenttemplate = (data)=>({
    type: actionTypes.DOCUMENT_TEMPLATE,
    data: fromJS(data)
})

const addSubList = (data)=>({
    type: actionTypes.ADD_SUBLIST,
    data: fromJS(data)
})

const createReimbursementAction = (data)=>({
    type: actionTypes.CREATE_REIMBUR_SEMENT_ACTION,
    data: fromJS(data)
})

const saveborrowsAction = (data)=>({
    type: actionTypes.ADD_BORROW,
    data: fromJS(data)
})

export const getordinarycostList = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        if(data != undefined){
            params.append("userId",data)

        }
        
        axios.post("/invoices-api/receipts/list",params).then(function(res){
            const data = res.data.data;
            dispatch(initordinarycost(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const getInitTypeList = (data)=>{
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

export const getDocumenttemplate = ()=>{
    return (dispatch)=>{
        axios.get("/api/documenttemplate.json").then(function(res){
            const data = res.data.data;
            dispatch(documenttemplate(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const saveSubList = (data)=>{
    return (dispatch)=>{
        dispatch(addSubList(data));
    }
}

//添加预支单
export const saveBorrows = (data)=>{
    return (dispatch)=>{
        axios.post("/invoices-api/advance/",data).then(function(res){
            const data = res.data.data;
            dispatch(inittypes(data));
            dispatch(getordinarycostList())
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const saveReimbursement = (data)=>{
    return (dispatch)=>{
        axios.post("/invoices-api/ordinarycost/",data).then(function(res){
            const data = res.data.data;
            dispatch(getordinarycostList())
        }).catch(function(error){
            console.log(error);
        });
    }
}