import { NEWS_EDIT, NEWS_SAVE_EDIT } from "../../../constants/ActionConst";
import http from "../../../http_common";


export const NewsEdit = (id) => async(dispatch)=>{
    try{
        const {data} = await http.get(`api/News/edit/${id}`);
        dispatch({type: NEWS_EDIT, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const NewsSaveEdit = (FormData) => async(dispatch)=>{
    try{
        const {data} = await http.put("api/News/save", FormData, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({type: NEWS_SAVE_EDIT, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}