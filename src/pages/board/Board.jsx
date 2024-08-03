import "../../App.css";
import "./board.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/Navbar";
import AddList from "../../components/addList/AddList";

import { useState } from "react";
import List from "../../components/List/List";
import SideBar from "../../components/sideBar/SideBar";

function Board() {
  const [showFormList, setShowFormList] = useState(false);

  return (
    <div className="boards">
      <Navbar />
      <SideBar />

      <div className="wrapper">
        <div className="wrapper-lists">
          <List />
          <List />

          <List />
          <div className="addList">
            <img src="plus.svg" alt="" />
            <button type="text" onClick={() => setShowFormList(true)}>
              Add another list
            </button>
            {showFormList && <AddList setShowFormList={setShowFormList} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
