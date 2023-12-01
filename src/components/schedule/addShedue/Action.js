import { SHEDULE_ADD, SHEDULE_LESSONS_ADD } from "../../../constants/ActionConst";
import http from "../../../http_common";


export const SheduleAdd = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/Shedule/addShedule", formData);
        dispatch({type: SHEDULE_ADD, payload: data});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const SheduleLessonsAdd = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/Shedule/addSheduleLessons", formData);
        dispatch({type: SHEDULE_LESSONS_ADD, payload: data});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}