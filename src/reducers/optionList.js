import {
    GET_OptionList_REQUEST,
    GET_OptionList_FAIL,
    GET_OptionList_SUCCESS,
  } from "../actiontypes";
  
  const data = {
     metadata: {}
  };
  
  const OptionList = (state = data, action) => {
    switch (action.type) {
      case GET_OptionList_REQUEST:
        return { metadata: {}  };
      case GET_OptionList_SUCCESS:
        return { metadata: { ...action.payload } };
      case GET_OptionList_FAIL:
        return { metadata: { } };
      default:
        return state;
    }
  };
  export default OptionList;