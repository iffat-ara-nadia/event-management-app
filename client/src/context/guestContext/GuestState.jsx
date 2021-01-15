import React, { useReducer } from "react";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import axios from "axios";
const GuestState = ({ children }) => {
  const initialState = {
    filterGuest: false,
    editAble: null, //can we use null? what otherwise?
    guests: []

    // guests: [
    //   {
    //     id: 1,
    //     name: "John Smith",
    //     phone: "333 444 6666",
    //     diatery: "Vegan",
    //     isConfirmed: false
    //   },
    //   {
    //     id: 2,
    //     name: "Marry Williams",
    //     phone: "222 555 7777",
    //     diatery: "Non-Veg",
    //     isConfirmed: true
    //   },
    //   {
    //     id: 3,
    //     name: "Marufur Rahman",
    //     phone: "111 888 9999",
    //     diatery: "Pescatarian",
    //     isConfirmed: true
    //   }
    // ]
  };

  const [state, dispatch] = useReducer(guestReducer, initialState);

  //Get Guests
  const getGuests = async () => {
    const { data: guests } = await axios.get(
      "http://localhost:5000/api/guests"
    );
    dispatch({
      type: "GET_GUEST",
      payload: guests
    });
  };

  //Add a new guest
  const addGuest = async guest => {
    const { data: newGuest } = await axios.post(
      "http://localhost:5000/api/guests",
      guest
    );
    console.log(newGuest);
    dispatch({
      type: "ADD_GUEST",
      payload: newGuest
    });
  };

  const editGuest = async guest => {
    dispatch({
      type: "EDIT_GUEST",
      payload: guest
    });
  };

  //update guest
  const updateGuest = async guest => {
    //Ofcourse it will take a guest parameter to update
    const res = await axios.put(
      `http://localhost:5000/api/guests/${guest._id}`,
      guest
    );
    console.log(res);
    dispatch({
      type: "UPDATE_GUEST",
      payload: res.data
    });
  };

  const clearEdit = () => {
    dispatch({
      type: "CLEAR_EDIT"
    });
  };

  //Delete guest
  const deleteGuest = async id => {
    await axios.delete(`http://localhost:5000/api/guests/${id}`);

    dispatch({
      type: "DELETE_GUEST",
      payload: id
    });
  };

  //toggle isconfirmed
  const toggleFilter = () => {
    dispatch({
      type: "TOGGLE_FILTER"
    });
  };

  //    const toggleGuestFilter = () => {
  //     dispatch({
  //       type: TOGGLE_GUESTFILTER
  //     })
  //   }
  console.log(state.filterGuest);

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        filterGuest: state.filterGuest,
        editAble: state.editAble,
        getGuests,
        addGuest,
        updateGuest,
        editGuest,
        clearEdit,
        deleteGuest,
        toggleFilter
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export default GuestState;
