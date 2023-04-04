import { USER_ALL, USER_DELETE } from "../../../constants/ActionConst";
import http from "../../../http_common";


export const GetUsers = () => async (dispatch) => {
    try{
        const {data} = await http.get("api/Users/all");
        dispatch({type: USER_ALL, payload: data});
        return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const UserDelete = (id) => async (dispatch) => {
    try{
        const {data} = await http.delete(`api/Users/deleteuser/${id}`);
        dispatch({type: USER_DELETE, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const SearchUser = (values) => async (dispatch) => {
    try {
        const { data } = await http.post("api/Users/searchuser", values, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({type: USER_ALL, payload: data});
        return Promise.resolve(data);
    }
    catch (err) {
        return Promise.reject(err.response.data);
    }
}