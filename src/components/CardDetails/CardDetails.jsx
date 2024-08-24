import label from "../../../public/label.svg";
import date from "../../../public/date.svg";
import user from "../../../public/user.svg";
import list from "../../../public/list.svg";
import attach from "../../../public/attach.svg";
import deleteimage from "../../../public/delete.svg";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import api from "../../apiAuth/auth";
import { AuthContext } from "../context/Auth";
import Cookies from "js-cookie";
import "./CardDetails.css";
import axios from "axios";

function CardDetails({
  onCloseModal,
  open,
  id,
  onDeleteCard,
  updateCardCoverImage,
}) {
  const [addComment, setAddComment] = useState(false);
  const [value, onChange] = useState(new Date());
  const { user } = useContext(AuthContext);

  const cookies = Cookies.get("token");
  const [coverImage, setCoverImage] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await api({
        url: `/cards/destroy/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${cookies}` },
      });

      if (response.ok || response.status === 204 || response.status === 203) {
        console.log("Card deleted successfully");
        onDeleteCard(id);
        onCloseModal();
        alert("Card deleted successfully");
      } else {
        console.error("Failed to delete the card. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while deleting the card:", error);
    }
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await api.post(`/cards/upload-photo/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies}`,
        },
      });

      if (response.status === 200) {
        console.log("Cover photo uploaded successfully");
        setCoverImage(response.data.photo_url);
        setAlertMessage("Cover image added/changed successfully!");
      } else {
        console.error("Failed to upload cover photo. Status:", response.status);
      }
    } catch (error) {
      console.error(
        "An error occurred while uploading the cover photo:",
        error
      );
    }
  };

  const handleRemoveCover = async () => {
    try {
      await api({
        url: `/cards/delete-photo/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${cookies}` },
      });
      console.log("Cover photo removed successfully");
      setCoverImage(null);
      updateCardCoverImage(id, null);
      onCloseModal();
    } catch (error) {
      console.error("An error occurred while removing the cover photo:", error);
    }
  };

  const handleSaveCover = () => {
    if (coverImage) {
      updateCardCoverImage(id, coverImage);
      onCloseModal();
    }
  };

  return (
    <div>
      <Modal classNames="card-modal" open={open} onClose={onCloseModal} center>
        <div className="modal-body">
          <h2>{id}</h2>
          <div className="wrapper">
            <div className="left">
              <div className="date-wrapper">
                <Form.Check type="checkbox" />
                <div className="state-wrapper">
                  <DatePicker onChange={onChange} value={value} />
                  <div className="state">Completed</div>
                </div>
              </div>
              <div className="description">
                <div className="header">
                  {/* SVG icon code */}
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
                      d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Description
                </div>
                <form>
                  <textarea name="desc" id=""></textarea>
                  <div className="wrapper">
                    <button type="button" className="save">
                      Save
                    </button>
                    <button type="button" className="cancel">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className="cover-wrapper">
                {coverImage ? (
                  <div className="cover-image">
                    <img
                      src={coverImage}
                      alt="Cover"
                      style={{
                        maxWidth: "200px",
                        height: "200px",
                        marginBottom: "20px",
                      }}
                    />
                    <br />
                    <button
                      className="remove-cover"
                      onClick={handleRemoveCover}
                    >
                      Remove Cover
                    </button>
                  </div>
                ) : (
                  <div className="upload-cover">
                    <label htmlFor="cover-upload">
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
                          d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V19H5V5ZM12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7ZM12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Upload Cover
                    </label>
                    <input
                      type="file"
                      id="cover-upload"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              <div className="comments">
                {!addComment ? (
                  <input
                    className="comment add-comment"
                    type="text"
                    placeholder="Write a comment…"
                    readOnly={true}
                    defaultValue=""
                    onClick={() => setAddComment(true)}
                  />
                ) : (
                  <form className="add-comments">
                    <input
                      className="comment add-comment input"
                      type="text"
                      placeholder="Write a comment…"
                    />
                    <div className="wrapper">
                      <button type="button" className="save">
                        Save
                      </button>
                      <button type="button" className="cancel">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                <div className="wrapper">
                  <input
                    className="comment"
                    type="text"
                    placeholder="Write a comment…"
                    readOnly={true}
                    defaultValue=""
                    onClick={() => setAddComment(true)}
                  />
                  <input
                    className="comment"
                    type="text"
                    placeholder="Write a comment…"
                    readOnly={true}
                    defaultValue=""
                    onClick={() => setAddComment(true)}
                  />
                  <input
                    className="comment"
                    type="text"
                    placeholder="Write a comment…"
                    readOnly={true}
                    defaultValue=""
                    onClick={() => setAddComment(true)}
                  />
                </div>
              </div>
            </div>

            <div className="right">
              <div className="item">
                <img src={user} alt="Join" /> Join
              </div>
              <div className="item">
                <img src={label} alt="Labels" /> Labels
              </div>
              <div className="item">
                <img src={attach} alt="Attachment" /> Attachment
              </div>
              <div className="item">
                <img src={date} alt="Dates" /> Dates
              </div>
              <div className="item">
                <img src={list} alt="Checklist" /> Checklist
              </div>
              <div className="item" onClick={handleSaveCover}>
                <img src={list} alt="Cover" /> Cover Save
              </div>
              <div className="item" onClick={handleDelete}>
                <img src={deleteimage} alt="Delete" /> Delete
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardDetails;
