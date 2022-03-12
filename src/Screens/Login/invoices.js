import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
} from "actiontypes";

export const Invoices = (type, getting, house_id, user_token, items, callBack = () => { },) => {
    return (dispatch) => {
         if (type === "logout") {
            dispatch({ type: GET_INVOICES_SUCCESS, payload: []});
            callBack();
        }
        else if (getting && house_id) {
            dispatch({ type: GET_INVOICES_REQUEST });
            if (items && 1) {
                dispatch({ type: GET_INVOICES_SUCCESS, payload: items });
                callBack();
            }
            else {
                dispatch({ type: GET_INVOICES_FAIL });
                callBack();
            }
        }
        //   else {
        //     dispatch({ type: GET_INVOICES_FAIL });
        //     callBack();
        //   }
    };
};