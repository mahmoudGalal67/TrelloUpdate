import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

function addList({ setShowFormList }) {
  return (
    <div className="addListForm">
      <form action="">
        <input type="text" name="" id="" placeholder="Enter list title…" />
        <div>
          <Button variant="primary">Add list</Button>
          <CloseButton onClick={() => setShowFormList(false)} />
        </div>
      </form>
    </div>
  );
}

export default addList;
