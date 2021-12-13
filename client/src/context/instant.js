/**
 ** Reducer function
 */
const reducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "AUTH":
      const newUser = {
        username: action.user.username,
        photo: action.user.photo,
      };
      return { ...state, isAuthenticated: action.isAuth, user: newUser };
    case "NOT-AUTH":
      return { ...state, isAuthenticated: false };
    case "VERIFY":
      return { ...state, isAuthenticated: action.isAuth, user: action.user };
    default:
      throw new Error();
  }
};

export default reducer;
