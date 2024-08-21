import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import { useRef, useState } from "react";
import Card from "../card/Card";

import Cookies from "js-cookie";
import api from "../../apiAuth/auth";

function List({ list, setboard }) {
  const [showCardList, setshowCardList] = useState(false);
  const [error, seterror] = useState(null);

  const cardTitle = useRef(null);

  const cookies = Cookies.get("token");

  const addCard = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api({
        url: "/cards/create",
        method: "post",
        headers: { Authorization: `Bearer ${cookies}` },
        data: {
          text: cardTitle.current.value,
          the_list_id: list.list_id,
          description: "test",
          photo: "",
        },
      });
      setboard((prev) => ({
        ...prev,
        lists_of_the_board: prev.lists_of_the_board.map((item) => {
          if (item.list_id == list.list_id) {
            return {
              ...item,
              cards_of_the_list: [
                ...item.cards_of_the_list,
                {
                  card_id: data.data.id,
                  card_text: data.data.text,
                },
              ],
            };
          } else {
            return item;
          }
        }),
      }));
      cardTitle.current.value = "";
      //  setshowCardList(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
    }
  };

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
              <form onSubmit={addCard}>
                <input
                  ref={cardTitle}
                  type="text"
                  placeholder="Enter card title…"
                  required
                />
                <div>
                  <Button type="submit" variant="primary">
                    Add card
                  </Button>
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
