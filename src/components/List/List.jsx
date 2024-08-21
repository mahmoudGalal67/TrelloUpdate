import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import { useState } from "react";
import Card from "../card/Card";

function List({ list }) {
  const [showCardList, setshowCardList] = useState(false);
  return (
    <div className="list">
      <h3>{list.list_title}</h3>
      <div className="wrapper">
        {list.cards_of_the_list.map((card) => (
          <Card key={card.card_id} card={card} />
        ))}

        <div className="addList addListCard">
          <img src="plus.svg" alt="" />
          <button type="text" onClick={() => setshowCardList(true)}>
            Add a card
          </button>
          {showCardList && (
            <div className="addListForm addListCard">
              <form action="">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter list title…"
                />
                <div>
                  <Button variant="primary">Add card</Button>
                  <CloseButton onClick={() => setshowCardList(false)} />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
