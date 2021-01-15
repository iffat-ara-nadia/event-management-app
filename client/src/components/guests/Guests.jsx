import React, { useContext, useEffect } from "react";
import Guest from "./Guest";
import GuestContext from "../../context/guestContext/guestContext";

const Guests = () => {
  const { guests, getGuests, filterGuest } = useContext(GuestContext);

  useEffect(() => {
    getGuests();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="guests">
      {guests
        .filter(guest => !filterGuest || guest.isConfirmed) //I can't understand this logic
        .map(guest => (
          <Guest key={guest._id} guest={guest} />
        ))}
    </div>
  );
};

export default Guests;
