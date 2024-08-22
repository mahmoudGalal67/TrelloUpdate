import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import api from "../../apiAuth/auth";
import { AuthContext } from "../context/Auth";
import "./navbar.css";

function NavBar({ workSpaces }) {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const workspaceTitle = useRef(null);
  const boardTitle = useRef(null);

  const location = useLocation();
  const path = location.pathname;
  const pathName = path.split("/")[1];

  const cookies = Cookies.get("token");
  const { workspaceId, boardId } = useParams(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users/get-users", {
          headers: { Authorization: `Bearer ${cookies}` },
        });
        setUsers(data.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message);
      }
    };

    fetchUsers();
  }, [cookies]);

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
      setError(err.response?.data?.message);
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
      setError(err.response?.data?.message);
    }
  };
  

   // Error in the response 
  const inviteUserToBoard = async (userId , email) => {
    try {
      console.log('Inviting user:', userId, 'to board:', boardId);
      
      const { data } = await api({
        url: "/boards/assign-user-to-board",
        method: "post",
        headers: { Authorization: `Bearer ${cookies}` },
        data: {
          board_id: boardId, 
          user_id: userId,
          email: email,
        },
      });
  
      alert(`User ${userId} has been invited!`);
    } catch (err) {
      console.error('API error:', err);
      console.error('Response data:', err.response?.data);
      setError(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
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
            {pathName === "" ? (
              <NavDropdown title="Workspaces" id="navbarScrollingDropdown">
                {workSpaces.map((workspace) => (
                  <NavDropdown.Item
                    key={workspace.workspace_id}
                    as={Link}
                    to={`/workspace/${workspace.workspace_id}`}
                  >
                    {workspace.workspace_name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : (
              ""
            )}

            {pathName === "board" && (
              <NavDropdown
                title="Invite Board Members"
                id="navbarScrollingDropdown"
              >
                {users.map((user) => (
                  <NavDropdown.Item
                    key={user.id}
                    onClick={() => inviteUserToBoard(user.id,user.email)}
                  >
                    {user.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            {pathName !== "board" && pathName !== "workspace" ? (
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



