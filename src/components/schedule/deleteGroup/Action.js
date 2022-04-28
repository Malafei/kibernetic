import http from "../../../http_common";
import {  GROUP_DELETE } from "../../../constants/ActionConst";


export const GroupDelete = (id) => async(dispatch)=>{
    try{
        console.log(id);
        const {data} = http.delete(`api/News/delete/${id}`);
        dispatch({type: GROUP_DELETE, payload: id});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}