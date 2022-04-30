import { USER_ADD, USER_ALL, USER_DELETE, USER_EDIT } from "../../../constants/ActionConst";

const initialState = {
    listUser: [],
    editedUser: {},
}

const userReducer = (state=initialState, action) => {
    const {type, payload}=action;
    switch(type) {

        case USER_ALL:{
            return{
                ...state,
                listUser: payload
            }
        }

        case USER_DELETE:{
            return{
                ...state,
                listUser: state.listUser.filter(item => item.id !== payload)
            }
        }

        case USER_EDIT: {
            return {
                ...state,
                editedUser: payload
            }
        }

        case USER_ADD: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
} 

export default userReducer;