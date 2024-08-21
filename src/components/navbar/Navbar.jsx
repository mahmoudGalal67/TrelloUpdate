import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Cookies from "js-cookie";

import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
import { AuthContext } from "../context/Auth";
import { useContext, useRef, useState } from "react";
import api from "../../apiAuth/auth";

function NavBar() {
  const [error, seterror] = useState(null);
  const { user } = useContext(AuthContext);
  const workspaceTitle = useRef(null);
  const boardTitle = useRef(null);

  const location = useLocation();
  const path = location.pathname;
  const pathName = path.split("/")[1];

  const cookies = Cookies.get("token");

  const { workspaceId } = useParams();

  const addBoard = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api({
        url: "/boards/create",
        method: "post",
        headers: { Authorization: `Bearer ${cookies}` },
        data: {
          name: boardTitle.current.value,
          workspace_id: workspaceId,
          photo: "",
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
    }
  };

  const addWorkspace = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api({
        url: "/workspaces/create",
        method: "post",
        headers: { Authorization: `Bearer ${cookies}` },
        data: { name: workspaceTitle.current.value },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
    }
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#">
          {" "}
          <img
            src="/logo.gif"
            style={{
              backgroundColor: "#0B5ED7",
              width: "80px",
              height: "30px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              title={pathName !== "board" ? "Workspaces" : "Boards"}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">tes</NavDropdown.Item>
              <NavDropdown.Item href="#action4">test 1</NavDropdown.Item>
              <NavDropdown.Item href="#action5">test 2</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Recent" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">tests</NavDropdown.Item>
              <NavDropdown.Item href="#action4">test 1</NavDropdown.Item>
              <NavDropdown.Item href="#action5">test 2</NavDropdown.Item>
              <NavDropdown.Item href="#action6">test 3</NavDropdown.Item>
            </NavDropdown>
            {pathName !== "board" ? (
              <NavDropdown
                title="Create Workspace"
                id="navbarScrollingDropdown"
                className="create"
              >
                <form className="container" onSubmit={addWorkspace}>
                  <h2>Workspace</h2>
                  <div className="input-wrapper">
                    <label htmlFor="">Workspace title *</label>
                    <input ref={workspaceTitle} type="text" required />
                  </div>
                  <Button type="submit" variant="primary">
                    Create Workspace
                  </Button>
                  {error && <span className="err">{error}</span>}
                </form>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Create Board"
                id="navbarScrollingDropdown"
                className="create"
              >
                <form className="container" onSubmit={addBoard}>
                  <h2>Board</h2>
                  <div className="input-wrapper">
                    <label htmlFor="">Board title *</label>
                    <input ref={boardTitle} type="text" required />
                  </div>
                  <Button type="submit" variant="primary">
                    Create Board
                  </Button>
                </form>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {user ? (
              <div className="user-name">{Array.from(user.name)[0]}</div>
            ) : (
              <Link to="/login">
                <img
                  src="/avatar.jpg"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
