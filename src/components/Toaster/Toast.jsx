// src/components/Toaster/Toast.jsx
import React, { useEffect } from "react";
import "./Toaster.css";

const Toast = ({ message, onClose, type = "default", actions, duration = 4000 }) => {
    useEffect(() => {
        // Auto-close only if there are no actions
        if (!actions || actions.length === 0) {
            const timer = setTimeout(() => {
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [onClose, actions, duration]);

    return (
        <div className={`custom-toast ${type}`}>
            <div>{message}</div>

            {actions && actions.length > 0 && (
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                    {actions.map((action, i) => (
                        <button
                            key={i}
                            onClick={action.onClick}
                            style={{
                                background: "white",
                                color: type === "error" ? "#DC2626" : "#2563EB",
                                border: "none",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Toast;
