import React from "react";
import "../../css/modal.css";

function Modal({
  visible = false,
  title = "Title",
  content = "Content",
  footer = "",
  onClose,
}) {
  if (!visible) return null;
  return (
    <div>
      <div className="my-modal " onClick={onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose}>
                {" "}
              </button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
