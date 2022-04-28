import { NEWS_ALL, NEWS_ADD, NEWS_DELETED, NEWS_EDIT, NEWS_SAVE_EDIT } from "../../constants/ActionConst";

const initialState = {
    list: [],
    editedNews: {},
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
        case NEWS_ADD: {
            return {
                ...state,
            };
        }
        case NEWS_DELETED:{
            return{
                ...state,
                list: state.list.filter(item => item.id !== payload)
            }
        }
        case NEWS_EDIT:{
            return{
                ...state,
                editedNews: payload
            }
        }
        default: {
            return state;
        }
    }
} 

export default newsReducer;