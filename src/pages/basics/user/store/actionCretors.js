import {fromJS} from 'immutable';
import axios from 'axios';
import * as actionTypes from './actionTypes';

const inittypes = (data)=>({
    type: actionTypes.SAVEUSER_DATA,
    data:fromJS(data)
})
export const batchDeleteByIds = (data)=>{
    return (dispatch)=>{
    
        var params = new URLSearchParams();
        params.append('ids', [...data]);

        console.log(params)
    
        axios.post("/user-api/user/batchDelete",params).then(function(res){
            const data = res.data.data;
            dispatch(getUserList(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const getUserList = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        params.append('type', data);

        axios.get("/user-api/user/list").then(function(res){
            const data = res.data.data;
            dispatch(inittypes(data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export const saveUsers = (data)=>{
    return (dispatch)=>{
        var params = new URLSearchParams();
        params.append('deptId', data.deptId);
        params.append('mail', data.mail);
        params.append('remark', data.remark);
        params.append('status', data.status);
        params.append('telephone', data.telephone);
        params.append('username', data.username);

        const status = data.status?1:0;

        axios.post("/user-api/user/",{
            deptId:data.deptId,
            mail:data.mail,
            remark:data.remark,
            status:status,
            telephone:data.telephone,
            username:data.username,
        },{
            headers: {
             'Content-Type':'application/json;charset=UTF-8'
            }
        }).then(function(res){
            const resp_code = res.data.resp_code;
            if(resp_code === 200){
                dispatch(getUserList(data));
            }
        }).catch(function(error){
            console.log(error);
        });
    }
}