import http from "../../../http_common";
import { NEWS_ALL, NEWS_DELETED } from "../../../constants/ActionConst";


export const NewsAll= () => async (dispatch)=>{
    try{
        const {data} = await http.get("api/News");
        dispatch({type: NEWS_ALL, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const NewsDelete = (id) => async(dispatch)=>{
    try{
        console.log(id);
        const {data} = http.delete(`api/News/delete/${id}`);
        dispatch({type: NEWS_DELETED, payload: id});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}