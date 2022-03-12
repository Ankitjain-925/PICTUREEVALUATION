import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_FAIL,
    GET_INVOICES_SUCCESS,
} from "../actiontypes";

const data = {
    invoices: [],
};

const Invoices = (state = data, action) => {
    switch (action.type) {
        case GET_INVOICES_REQUEST:
            return { invoices: { INVOICES: [] } };
        case GET_INVOICES_SUCCESS:{
            return { invoices: { INVOICES: action.payload } };
        }
        case GET_INVOICES_FAIL:
            return { invoices: { INVOICES: [] } };
        default:
            return state;
    }
};
export default Invoices;