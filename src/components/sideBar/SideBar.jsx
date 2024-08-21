import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./SideBar.css";
import { Link } from "react-router-dom";

function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="sideNav-link" variant="primary" onClick={handleShow}>
        <img src="/rightArrow.svg" alt="" />
      </Button>

      <div className="side-bar"></div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
            workspace name
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/allBoards" className="board-item" onClick={handleClose}>
            <span>Boards </span>
          </Link>
          <a href="#" className="board-item">
            <span>Members</span>
          </a>
          <a href="#" className="board-item">
            <span>Table</span>
          </a>
          <a href="#" className="board-item">
            <span>Calender</span>
          </a>
          <h2>Your Boards</h2>
          <a href="#" className="board-item">
            <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
            <span>Borad name</span>
          </a>
          <a href="#" className="board-item">
            <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
            <span>Borad name</span>
          </a>
          <a href="#" className="board-item">
            <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
            <span>Borad name</span>
          </a>
          <a href="#" className="board-item">
            <img src="photo-1675981004510-4ec798f42006.jpg" alt="" />
            <span>Borad name</span>
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;
