import React, { useContext } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const Guest = ({ guest }) => {
  const { _id, name, diatery, phone, isConfirmed } = guest;

  const { updateGuest, editGuest, deleteGuest } = useContext(GuestContext);

  const handleConfirm = () => {
    updateGuest({ ...guest, isConfirmed: !isConfirmed });
  };

  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={isConfirmed ? "confirm" : ""}>
            Confirmed
            <i className={isConfirmed ? "confirm && fas fa-check-square" : ""}>
              <input type="checkbox" onChange={handleConfirm} />
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={() => deleteGuest(_id)}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span
          className={
            "badge " +
            //After writing badge, there should be a empty space
            (diatery === "Non-Veg"
              ? "red"
              : diatery === "Vegan"
              ? "green"
              : "seaGreen")
          }
        >
          {diatery}
        </span>
        <div className="contact">
          <i className="fas fa-phone-alt" />
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Guest;
