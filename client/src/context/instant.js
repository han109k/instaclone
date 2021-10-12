/**
 ** Reducer function
 */
const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.isAuth, username: action.user };
    default:
      throw new Error();
  }
};

export default reducer;
