import { USER_EDIT, USER_SAVE_EDIT } from "../../../constants/ActionConst";
import http from "../../../http_common";


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