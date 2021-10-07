/**
 ** Reducer function
 */
const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      throw new Error();
  }
};

export default reducer;
