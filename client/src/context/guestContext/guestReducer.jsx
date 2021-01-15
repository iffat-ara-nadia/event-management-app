export default (state, action) => {
  switch (action.type) {
    case "GET_GUEST":
      return {
        ...state,
        guests: action.payload
      };

    case "ADD_GUEST":
      return {
        ...state,
        guests: [...state.guests, action.payload] //got error coz didn't write action.payload
      };

    case "UPDATE_GUEST":
      return {
        ...state,
        guests: state.guests.map(
          guest => (guest._id === action.payload._id ? action.payload : guest) //myError: I wrote guest:action.payload
          //don't understand this line
        )
      };

    case "EDIT_GUEST":
      return {
        ...state,
        editAble: action.payload //need a clear understanding of this line.
      };

    case "CLEAR_EDIT":
      return {
        ...state,
        editAble: null
      };

    case "DELETE_GUEST":
      return {
        ...state,
        guests: state.guests.filter(guest => guest._id !== action.payload)
      };

    case "TOGGLE_FILTER":
      return {
        ...state,
        filterGuest: !state.filterGuest
      };
    default:
      return state;
  }
};
