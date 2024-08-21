import React, { useState } from "react";

import "./card.css";
import CardDetails from "../CardDetails/CardDetails";

function Card({ card }) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="item" onClick={onOpenModal}>
        {card.card_text}
      </div>
      <CardDetails id={card.card_id} onCloseModal={onCloseModal} open={open} />
    </>
  );
}

export default Card;
