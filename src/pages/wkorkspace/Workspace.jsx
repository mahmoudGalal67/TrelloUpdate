import "./workspace.css";
import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";

import Cookies from "js-cookie";

import Spinner from "react-bootstrap/Spinner";
import api from "../../apiAuth/auth";
import { AuthContext } from "../../components/context/Auth";

function Workspace() {
  const [loading, setLoading] = useState(true);
  const [workSpaces, setworkSpaces] = useState([]);

  const cookies = Cookies.get("token");

  useEffect(() => {
    const getWorkSpaces = async () => {
      try {
        const { data } = await api({
          url: "/workspaces/get-workspaces",
          // Authorization: `Bearer ${cookies?.token}`,
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
      <Navbar />
      <SideBar />
      <div className="views">
        {workSpaces.map((workspace) => (
          <div className="workspace-item" key={workSpaces.workspace_id}>
            {" "}
            <h2>{workspace.workspace_name}</h2>
            {workspace.boards_of_the_workspace.map((board) => (
              <div className="wrapper">
                <Link
                  className="board-link"
                  to={`board/${workspace.workspace_id}/${board.board_id}`}
                  key={board.board_id}
                >
                  <div className="card">
                    <img src="photo-1719825718360-7de63c92135f.webp" alt="" />
                    <p>{board.board_name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
        <div className="workspace-item">
          {" "}
          <h2>YOUR WORKSPACES</h2>
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
          {" "}
          <h2>YOUR WORKSPACES</h2>
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
  );
}

export default Workspace;
