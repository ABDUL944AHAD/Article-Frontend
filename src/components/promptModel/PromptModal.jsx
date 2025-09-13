// components/PromptModal.jsx
import React from "react";
import "./PromptModal.css";

const PromptModal = ({ open, onClose, onConfirm }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Ready to share your thoughts?</h2>
                <p>Login or sign up to publish and save your article ✨</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-confirm" onClick={onConfirm}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default PromptModal;
