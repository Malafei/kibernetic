import { NEWS_ALL } from "../../constants/ActionConst";

const initialState = {
    list: []
}

const newsReducer = (state=initialState, action) => {
    const {type, payload}=action;
    switch(type) {
        case NEWS_ALL: {
            return {
                ...state,
                list: payload
            };
        }
        /* case USERS_DELETED:{
            return{
                ...state,
                list: state.list.filter(item => item.id !== payload)
            }
        }
        case USERS_EDIT:{
            
        } */

        default: {
            return state;
        }
    }
} 

export default newsReducer;