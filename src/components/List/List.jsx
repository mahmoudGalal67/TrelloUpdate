import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import { useState } from "react";

function List() {
  const [showCardList, setshowCardList] = useState(false);
  return (
    <div className="list">
      <h3>test</h3>
      <div className="wrapper">
        <div className="item">test</div>
        <div className="item">test</div>
        <div className="item">test</div>
        <div className="item">test</div>
        <div className="item">test</div>

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
