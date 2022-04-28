import {  GROUP_ADD, GROUP_DELETE, SHOW_GROUP } from "../../../constants/ActionConst";

const initialState = {
    listGroup: [],
    editedShedule: {},
}

const groupReducer = (state=initialState, action) => {
    const {type, payload}=action;
    switch(type) {
        
        case SHOW_GROUP:{
            return{
                ...state,
                listGroup: payload
            }
        }
        case GROUP_ADD: {
            return {
                ...state,
            };
        }
        case GROUP_DELETE:{
            return{
                ...state,
                listGroup: state.listGroup.filter(item => item.id !== payload)
            }
        }

        default: {
            return state;
        }
    }
} 

export default groupReducer;