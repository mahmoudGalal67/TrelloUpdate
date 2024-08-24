import React, { useState, useEffect } from "react";
import "./card.css";
import CardDetails from "../CardDetails/CardDetails";

function Card({ card, onCardDelete, updateCardCoverImage }) {
  const [open, setOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(card.photo_url);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleDeleteCard = (id) => {
    onCardDelete(id);
    onCloseModal();
  };
  useEffect(() => {
    setCoverImage(card.photo_url);
  }, [card.photo_url]);

  return (
    <>
      <div className="item" onClick={onOpenModal}>
        <div>
          {coverImage && (
            <img
              src={coverImage}
              alt="Card Cover"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          )}
        </div>
        {card.card_text}
      </div>
      <CardDetails
        id={card.card_id}
        onCloseModal={onCloseModal}
        open={open}
        onDeleteCard={handleDeleteCard}
        setCoverImage={setCoverImage}
        updateCardCoverImage={updateCardCoverImage}
      />
    </>
  );
}

export default Card;
