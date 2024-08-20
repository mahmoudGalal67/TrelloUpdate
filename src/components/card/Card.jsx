import React, { useState } from "react";

import "./card.css";
import CardDetails from "../CardDetails/CardDetails";

function Card({ id }) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="item" onClick={onOpenModal}>
        {id} card
      </div>
      <CardDetails id={id} onCloseModal={onCloseModal} open={open} />
    </>
  );
}

export default Card;
