import { LOGIN, LOGOUT } from "../../constants/ActionConst";


const initialState = {
    isAuth: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case LOGIN:{
            return{
                isAuth: true,
                user: payload
            }
        }
        case LOGOUT: {
            return{
                isAuth: false
            }
        }
        default: {
            return state;
        }
    }
}
export default authReducer;