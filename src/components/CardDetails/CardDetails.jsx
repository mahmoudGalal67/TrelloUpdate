import label from "../../../public/label.svg";
import date from "../../../public/date.svg";
import user from "../../../public/user.svg";
import list from "../../../public/list.svg";
import attach from "../../../public/attach.svg";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import Form from "react-bootstrap/Form";

import "./CardDetails.css";
import { useState } from "react";

function CardDetails({ onCloseModal, open, id }) {
  const [addComment, setaddComment] = useState(false);

  const [value, onChange] = useState(new Date());
  return (
    <div>
      {" "}
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
                <form action="">
                  <textarea name="desc" id=""></textarea>
                  <div className="wrapper">
                    <button className="save">Save</button>
                    <button className="cancel">Cancel</button>
                  </div>
                </form>
              </div>
              <div className="comments">
                {!addComment ? (
                  <input
                    className="comment add-comment"
                    type="text"
                    placeholder="Write a comment…"
                    data-testid="card-back-new-comment-input-skeleton"
                    aria-placeholder="Write a comment…"
                    aria-label="Write a comment"
                    read-only="true"
                    defaultValue=""
                    onClick={() => setaddComment(true)}
                  ></input>
                ) : (
                  <form className="add-comments">
                    <input
                      className="comment add-comment input"
                      type="text"
                      placeholder="Write a comment…"
                      data-testid="card-back-new-comment-input-skeleton"
                      aria-placeholder="Write a comment…"
                      aria-label="Write a comment"
                    ></input>
                    <div className="wrapper">
                      <button className="save">Save</button>
                      <button className="cancel">Cancel</button>
                    </div>
                  </form>
                )}
                <div className="wrapper">
                  <input
                    className="comment "
                    type="text"
                    placeholder="Write a comment…"
                    data-testid="card-back-new-comment-input-skeleton"
                    aria-placeholder="Write a comment…"
                    aria-label="Write a comment"
                    read-only="true"
                    defaultValue=""
                    onClick={() => setaddComment(true)}
                  ></input>
                  <input
                    className="comment "
                    type="text"
                    placeholder="Write a comment…"
                    data-testid="card-back-new-comment-input-skeleton"
                    aria-placeholder="Write a comment…"
                    aria-label="Write a comment"
                    read-only="true"
                    defaultValue=""
                    onClick={() => setaddComment(true)}
                  ></input>
                  <input
                    className="comment"
                    type="text"
                    placeholder="Write a comment…"
                    data-testid="card-back-new-comment-input-skeleton"
                    aria-placeholder="Write a comment…"
                    aria-label="Write a comment"
                    read-only="true"
                    defaultValue=""
                    onClick={() => setaddComment(true)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="item">
                <img src={user} alt="" /> Join{" "}
              </div>
              <div className="item">
                <img src={label} alt="" /> Labels{" "}
              </div>
              <div className="item">
                <img src={attach} alt="" /> Attachment{" "}
              </div>
              <div className="item">
                <img src={date} alt="" /> Dates{" "}
              </div>
              <div className="item">
                <img src={list} alt="" /> Checklist{" "}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardDetails;
