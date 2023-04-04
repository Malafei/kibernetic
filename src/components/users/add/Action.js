import { USER_ADD } from "../../../constants/ActionConst";
import http from "../../../http_common";

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