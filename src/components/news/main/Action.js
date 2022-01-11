import http from "../../../http_common";
import { NEWS_ALL } from "../../../constants/ActionConst";


export const NewsAll= () => async (dispatch)=>{
    try{
        console.log("action 7")
        const {data} = await http.get("api/News");
        console.log(data);
        console.log("aasasadasda");
        dispatch({type: NEWS_ALL, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}