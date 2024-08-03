import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./AllBorads.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import SideBar from "../../components/sideBar/SideBar";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Invite to Workspace
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          size="md"
          type="text"
          placeholder="Email address or name"
        />
        <div className="ivite">
          <p>Invite someone to this Workspace with a link:</p>
          <a href="#">
            <img src="link.svg" alt="" />
            Create Link
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function AllBoards() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <NavBar />
      <SideBar />

      <div className="allboards">
        <div className="header">
          <div className="left">
            <img src="" alt="" />
            <h2>Trello Workspace</h2>
          </div>
          <div className="right">
            <Button
              className="invite-link"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                  fill="currentColor"
                ></path>
              </svg>
              Invite Workspace members
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
        <div className="body">
          <h2>Boards</h2>
          <div className="filters">
            <div className="left">
              <div className="item">
                <label htmlFor="">Sort by</label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="item">
                <label htmlFor="">Filter by</label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </div>
            <div className="right">
              <label htmlFor="">Search</label>

              <div className="item">
                <Form.Control size="md" type="text" placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="views">
            <div className="workspace-item">
              <div className="wrapper">
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="workspace-item">
              <div className="wrapper">
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="workspace-item">
              <div className="wrapper">
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1716369414930-bcdc1565fa3c.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
                <Link className="board-link" to="/board">
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>first workspace</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBoards;
