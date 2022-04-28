import jwt from "jsonwebtoken";
import http from "../../../http_common";
import setAuthorizationToken from "../../utils/setAuthToken";
import { LOGIN, LOGOUT } from "../../../constants/ActionConst";


export const LoginUser = (data) => async (dispatch) =>{
    try{
        const response = await http.post("api/Account/login", data);
        const token = response.data.token;
        console.log(token);
        dispatch(setAuthUserByToken(token));

        return Promise.resolve(response);
    }
    catch(err){
        console.log(err.response.data);
        return Promise.reject(err.response.data);
    }
}


export const setAuthUserByToken = (token) => (dispatch) => {
    localStorage.token = token; // кідаєм його в храніліще
    setAuthorizationToken(token);
    const user = jwt.decode(token); // декодуєм його для витягнення даних
    // кідаєм в діспатч тип події і юзера
    dispatch({
        type: LOGIN,
        payload: user.name
    });
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT
    });
}