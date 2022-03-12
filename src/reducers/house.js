import {
    GET_HOUSE_REQUEST,
    GET_HOUSE_FAIL,
    GET_HOUSE_SUCCESS,
  } from "../actiontypes";
  
  const data = {
    House:  {value: null} ,
  };
  
  const houseSelect = (state = data, action) => {
    switch (action.type) {
      case GET_HOUSE_REQUEST:
        return { House:  {value: null}  };
      case GET_HOUSE_SUCCESS:
        return { House : action.payload };
      case GET_HOUSE_FAIL:
        return { House: {value: null} };
      default:
        return state;
    }
  };
  export default houseSelect;