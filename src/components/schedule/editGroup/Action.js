import { GROUP_EDIT } from "../../../constants/ActionConst";
import http from "../../../http_common";

export const GroupEdit = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/Shedule/editGroupShedule", formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        console.log(data)
        dispatch({type: GROUP_EDIT});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}