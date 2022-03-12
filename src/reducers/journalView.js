import {
    GET_JOURNAL_REQUEST,
    GET_JOURNAL_FAIL,
    GET_JOURNAL_SUCCESS,
  } from "../actiontypes";
  
  const data = {
    Overview:  false ,
  };
  
  const overView = (state = data, action) => {
    switch (action.type) {
      case GET_JOURNAL_REQUEST:
        return { Overview:  false  };
      case GET_JOURNAL_SUCCESS:
        return { Overview : action.payload };
      case GET_JOURNAL_FAIL:
        return { Overview: false };
      default:
        return state;
    }
  };
  export default overView;