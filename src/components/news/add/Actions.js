import { NEWS_ADD } from "../../../constants/ActionConst";
import http from "../../../http_common";


export const NewsAdd = (formData) => async(dispatch)=>{
    try{
        const {data} = await http.post("api/News/addNews", formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({type: NEWS_ADD});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}