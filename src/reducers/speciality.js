import {
    GET_SPECIALITY_REQUEST,
    GET_SPECIALITY_FAIL,
    GET_SPECIALITY_SUCCESS,
} from "../actiontypes";

const data = {
    speciality: [],
};

const Speciality = (state = data, action) => {
    switch (action.type) {
        case GET_SPECIALITY_REQUEST:
            return { speciality: { SPECIALITY: false } };
        case GET_SPECIALITY_SUCCESS:{
            return { speciality: { SPECIALITY: [...action.payload] } };
        }
        case GET_SPECIALITY_FAIL:
            return { speciality: { SPECIALITY: false } };
        default:
            return state;
    }
};
export default Speciality;