const intialState = {
  layoutConfig: {
    type: 0,
  },
};

const layout = (state = intialState, action) => {
  const newState = { ...state };

  //ToDo : dummy actions for
  switch (action.type) {
    case "AGE_UP":
      newState.age += action.value;
      break;

    case "AGE_DOWN":
      newState.age -= action.value;
      break;
  }
  return newState;
};

export default layout;
