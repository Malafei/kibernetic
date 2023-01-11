import { SHEDULE_ALL, SHEDULE_ADD, SHEDULE_DELETED, SHEDULE_EDIT, SHEDULE_SAVE_EDIT, GROUP_ADD } from "../../../constants/ActionConst";

const initialState = {
    listGroup: [],
    list: [],
    editedShedule: {},
}

const sheduleReducer = (state=initialState, action) => {
    const {type, payload}=action;
    switch(type) {
        case SHEDULE_ALL: {
            return {
                ...state,
                list: payload
            };
        }
        case SHEDULE_ADD: {
            return {
                ...state,
            };
        }
        case SHEDULE_DELETED:{
            return{
                ...state,
                list: state.list.filter(item => item.id !== payload)
            }
        }
        case SHEDULE_EDIT:{
            return{
                ...state,
                editedShedule: payload
            }
        }
        case SHEDULE_SAVE_EDIT:{
            return{
                ...state,
            }
        }

        default: {
            return state;
        }
    }
} 

export default sheduleReducer;