import jwt from "jsonwebtoken";
import http from "../../../http_common";
import setAuthorizationToken from "../../utils/setAuthToken";
import { LOGIN, LOGOUT } from "../../../constants/ActionConst";


  /* } catch (err) {
      if (axios.isAxiosError(err)) { // перевіряєм чи аксіос ловить помилки сервера
          const serverError = err as AxiosError<ILoginErrors>; //присвоюєм їх

          if (serverError && serverError.response) {
              const { errors } = serverError.response.data;
              return Promise.reject(errors); //повертаєм проміс з помилками
          }
      }
      
      return Promise.reject(); // якщо вони не в аксіосі повертаєм пустий хибний проміс */    
  //}


export const LoginUser = (data) => async (dispatch) =>{
    try{
        const response = await http.post("api/Account/login", data);
        const token = response.data.token;
        console.log(token);
        dispatch(setAuthUserByToken(token));

        return Promise.resolve(response);
    }
    catch(err){
        console.log(err);
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