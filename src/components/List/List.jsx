import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import { useRef, useState } from "react";
import Card from "../card/Card";

import Cookies from "js-cookie";
import api from "../../apiAuth/auth";
import Dropdown from "react-bootstrap/Dropdown";
import "./list.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function List({ list, setboard , board_id }) {
  const [showCardList, setshowCardList] = useState(false);
  const [error, seterror] = useState(null);
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedListName, setEditedListName] = useState(list.list_title);
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


  const handleCardDelete = async (cardId) => {
    try {
      await api({
        url: `/cards/destroy/${cardId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${cookies}` },
      });
  
      setboard((prev) => ({
        ...prev,
        lists_of_the_board: prev.lists_of_the_board.map((item) => {
          if (item.list_id === list.list_id) {
            return {
              ...item,
              cards_of_the_list: item.cards_of_the_list.filter(
                (card) => card.card_id !== cardId
              ),
            };
          }
          return item;
        }),
      }));
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
    }
  };
  
  const updateCardCoverImage = (cardId, coverImageUrl) => {
    setboard((prev) => ({
      ...prev,
      lists_of_the_board: prev.lists_of_the_board.map((item) => {
        if (item.list_id === list.list_id) {
          return {
            ...item,
            cards_of_the_list: item.cards_of_the_list.map((card) =>
              card.card_id === cardId
                ? { ...card, photo_url: coverImageUrl }
                : card
            ),
          };
        }
        return item;
      }),
    }));
  };
  
  // Function to delete a list
  const handleDeleteList = async () => {
    if(window.confirm("Are you sure you want to delete this list?")){
    try {
      await api({
        url: `/lists/destroy/${list.list_id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${cookies}` },
      });

      setboard((prev) => ({
        ...prev,
        lists_of_the_board: prev.lists_of_the_board.filter(
          (item) => item.list_id !== list.list_id
        ),
      }));
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
    }
  }
  };

 // Function to handle list title editing

    const handleEditListClick = () => {
      setEditedListName(list.list_title);
      setShowEditModal(true);
    };
  
    const handleSaveListClick = async () => {
      if (!editedListName.trim()) {
        seterror("List name cannot be empty");
        return;
      }
    
      try {
        const response = await api({
          url: "/lists/update",
          method: "POST",
          headers: { Authorization: `Bearer ${cookies}` },
          data: {
            list_id: list.list_id,
            board_id: board_id,
            title: editedListName,
          },
        });
    
        if (response.data.success) {
          setboard((prev) => ({
            ...prev,
            lists_of_the_board: prev.lists_of_the_board.map((item) =>
              item.list_id === list.list_id ? { ...item, list_title: editedListName } : item
            ),
          }));
          setShowEditModal(false);
        } else {
          seterror("Failed to update the list. Please try again.");
        }
      } catch (err) {
        console.log("Error response:", err.response?.data);
        seterror(err.response?.data?.message || "An error occurred while updating the list.");
      }
    };
    
  return (
    <div className="list">
       <div className="list-header d-flex align-items-center justify-content-between my-2">
      <h3>{list.list_title}</h3>
      <Dropdown>
          <Dropdown.Toggle
            as="button"
            className="custom-dropdown-toggle p-0 no-caret"
          >
            <span className="vertical-dots">⋮</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white border-0 shadow">
            <Dropdown.Item
              onClick={handleEditListClick}
            >
              <i className="fa-regular fa-pen-to-square me-2"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              onClick={handleDeleteList}
            >
              <i className="fa-regular fa-trash-can me-2"></i> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>

        
      <div className="wrapper">
        {list.cards_of_the_list.map((card) => (
          <Card key={card.card_id} card={card} onCardDelete={handleCardDelete}  updateCardCoverImage={updateCardCoverImage}/>
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formListName">
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              value={editedListName}
              onChange={(e) => setEditedListName(e.target.value)}
              placeholder="Enter new list name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={ handleSaveListClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default List;
