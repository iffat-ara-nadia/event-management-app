import React, { useState, useContext, useEffect } from "react";

import GuestContext from "../../context/guestContext/guestContext";

const GuestForm = () => {
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [diatery, setDiatery] = useState("Non-veg");

  const { addGuest, editAble, updateGuest, clearEdit } = useContext(
    GuestContext
  );
  //if (!editAble !== null) console.log(editAble);
  useEffect(() => {
    if (editAble !== null) {
      setGuest(editAble); //????
    } else {
      // setGuest(guest); //My implemented line: wrong coz it makes 2 guests with same id and does not clear fields.
      setGuest({
        ///WHY is it needed???
        name: "",
        phone: "",
        diatery: "Non-Veg",
      });
    }
  }, [editAble]);

  const [guest, setGuest] = useState({
    //guest??
    name: "",
    phone: "",
    diatery: "Non-Veg",
  });
  const { name, phone, diatery } = guest; //where is this 'guest' come from? Ans: Destructuring of
  //'guest' object.
  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editAble !== null) {
      updateGuest(guest);
      clearEdit();
    } else {
      addGuest(guest);
      setGuest({
        name: "",
        phone: "",
        diatery: "Non-Veg",
      });
    }
  };

  return (
    <div className="invite-section">
      <h1>{!editAble ? "Invite Someone" : "Edit Guest"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">
            Non-Veg
            <input
              type="radio"
              name="diatery" //spelling mismatch of diatery
              value="Non-Veg"
              checked={diatery === "Non-Veg"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Vegan
            <input
              type="radio"
              name="diatery"
              value="Vegan"
              checked={diatery === "Vegan"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Pescatarian
            <input
              type="radio"
              name="diatery"
              value="Pescatarian"
              checked={diatery === "Pescatarian"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="submit"
          value={editAble !== null ? "Update guest" : "Add Guest"}
          className="add"
        />
        {editAble !== null ? (
          <input
            value="Cancel"
            type="button"
            style={{ background: "#197562", marginTop: "5px" }}
            onClick={clearEdit}
            className="btn btn-secondary"
          />
        ) : null}
        {/* className="btn didn't work,so I used "add" */}
      </form>
    </div>
  );
};

export default GuestForm;
