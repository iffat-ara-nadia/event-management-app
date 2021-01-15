export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        error: null
      };

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      //When we successfully Registered / Logged in we are getting out token back
      //and this token will be sent to our payload.
      localStorage.setItem("token", action.payload); //This will set our token to the localStorage.

      return {
        ...state,
        userAuth: true,
        error: null
      };

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOG_OUT":
    case "SET_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
        error: action.payload
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
