import http from "../../../http_common";
import { GROUP_ADD } from "../../../constants/ActionConst";



export const GroupAdd = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/Shedule/addGroupShedules", formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        console.log(data)
        dispatch({type: GROUP_ADD});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}