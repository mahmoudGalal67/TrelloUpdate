import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./navbar.css";

function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const addWorkspace = (e) => {
    e.preventDefault();
    navigate(0);
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#">
          {" "}
          <img
            src="logo.gif"
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
              title={path !== "/board" ? "Workspaces" : "Boards"}
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
            {path !== "/board" ? (
              <NavDropdown
                title="Create Workspace"
                id="navbarScrollingDropdown"
                className="create"
              >
                <form className="container" onSubmit={addWorkspace}>
                  <h2>Workspace</h2>
                  <div className="input-wrapper">
                    <label htmlFor="">Workspace title *</label>
                    <input type="text" required />
                  </div>
                  <Button type="submit" variant="primary">
                    Create Workspace
                  </Button>
                </form>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Create Board"
                id="navbarScrollingDropdown"
                className="create"
              >
                <form className="container" onSubmit={addWorkspace}>
                  <h2>Board</h2>
                  <div className="input-wrapper">
                    <label htmlFor="">Board title *</label>
                    <input type="text" required />
                  </div>
                  <Button variant="primary">Create Board</Button>
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
            <Link to="/login">
              <img
                src="avatar.jpg"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
