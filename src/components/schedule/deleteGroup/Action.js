import http from "../../../http_common";
import {  GROUP_DELETE } from "../../../constants/ActionConst";


export const GroupDelete = (id) => async(dispatch)=>{
    try{
        const {data} = http.delete(`api/Shedule/delete/${id}`);
        dispatch({type: GROUP_DELETE, payload: id});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}