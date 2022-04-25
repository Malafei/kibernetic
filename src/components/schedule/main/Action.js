import http from "../../../http_common";
import { SHEDULE_ALL, SHOW_GROUP } from "../../../constants/ActionConst";




export const SheduleAll= () => async (dispatch)=>{
    try{
        const {data} = await http.get("api/Shedule");
        dispatch({type: SHEDULE_ALL, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}


export const ShowGroup= () => async (dispatch)=>{
    try{
        const {data} = await http.get("api/Shedule/showGroup");
        dispatch({type: SHOW_GROUP, payload: data});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}