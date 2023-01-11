import { SHEDULE_ADD } from "../../../constants/ActionConst";
import http from "../../../http_common";


export const SheduleAdd = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/Shedule/addShedule", formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({type: SHEDULE_ADD, payload: data});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}