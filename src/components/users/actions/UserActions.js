import { USER_ADD, USER_ALL, USER_DELETE, USER_EDIT, USER_SAVE_EDIT } from "../../../constants/ActionConst";
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

export const UserEdit = (id) => async (dispatch) => {
    try{
        const {data} = await http.get(`api/Users/edituser/${id}`);
        dispatch({type: USER_EDIT, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const UserEditSave = (formdata) => async (dispatch) => {
    try {
        const { data } = await http.put("api/Users/saveuser", formdata, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({ type: USER_SAVE_EDIT, payload: data });
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const UserAdd = (formdata) => async (dispatch) => {
    try {
        const { data } = await http.post("api/Users/adduser", formdata, { headers: { 'Content-Type': 'multipart/form-data' }});
        dispatch({ type: USER_ADD, payload: data });
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err.response.data);
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