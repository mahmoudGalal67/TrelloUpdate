import "./Workspaces.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";
import Cookies from "js-cookie";
import Spinner from "react-bootstrap/Spinner";
import api from "../../apiAuth/auth";
import { Modal, Button, Form } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';


function Workspace() {
  const [loading, setLoading] = useState(true);
  const [workSpaces, setworkSpaces] = useState([]);
  const [editingBoardId, setEditingBoardId] = useState(null); 
  const [editedBoardName, setEditedBoardName] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  const cookies = Cookies.get("token");

  useEffect(() => {
    const getWorkSpaces = async () => {
      try {
        const { data } = await api({
          url: "/workspaces/get-workspaces",
          headers: { Authorization: `Bearer ${cookies}` },
        });
        setworkSpaces(data.result);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getWorkSpaces();
  }, [cookies]);

  const handleEditClick = (board_id, currentBoardName) => {
    setEditingBoardId(board_id);
    setEditedBoardName(currentBoardName);
    setShowModal(true); 
  };

  const handleSaveClick = async (workspace_id, board_id) => {
    try {
      const response = await api({
        url: `/api/boards/update-board-name/${board_id}`, 
        method: "PUT",
        headers: { Authorization: `Bearer ${cookies}` },
        data: { board_name: editedBoardName },
      });

      setworkSpaces((prevWorkspaces) =>
        prevWorkspaces.map((workspace) =>
          workspace.workspace_id === workspace_id
            ? {
                ...workspace,
                boards_of_the_workspace: workspace.boards_of_the_workspace.map(
                  (board) =>
                    board.board_id === board_id
                      ? { ...board, board_name: editedBoardName }
                      : board
                ),
              }
            : workspace
        )
      );

      setEditingBoardId(null);
      setEditedBoardName("");
      setShowModal(false);
    } catch (error) {
      console.log("Error updating board name:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBoardId(null);
    setEditedBoardName("");
    setShowModal(false); 
  };

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center position-fixed top-0 left-0">
        <Spinner animation="border" role="status" variant="primary" size="md">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar workSpaces={workSpaces} />
      <SideBar />
      <div className="views">
        {workSpaces.map((workspace) => (
          <div className="workspace-item" key={workspace.workspace_id}>
            <h2>{workspace.workspace_name}</h2>
            <div className="wrapper">
              {workspace.boards_of_the_workspace.map((board) => (
                <div className="board-container" key={board.board_id}>
                  {/* ${board.imageUrl} */}
                  <div className="card" style={{ backgroundImage: `url("photo-1719825718360-7de63c92135f.webp")` }}>
                    <div className="card-content">
                      <Link
                        className="board-link"
                        to={`board/${workspace.workspace_id}/${board.board_id}`}
                      >
                        <p className="board-name">{board.board_name}</p>
                      </Link>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleEditClick(board.board_id, board.board_name)
                        }
                        className="edit-button"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Board Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBoardName">
            <Form.Label>Board Name</Form.Label>
            <Form.Control
              type="text"
              value={editedBoardName}
              onChange={(e) => setEditedBoardName(e.target.value)}
              placeholder="Enter new board name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleSaveClick(
                workSpaces.find((ws) =>
                  ws.boards_of_the_workspace.some(
                    (b) => b.board_id === editingBoardId
                  )
                ).workspace_id,
                editingBoardId
              )
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Workspace;
