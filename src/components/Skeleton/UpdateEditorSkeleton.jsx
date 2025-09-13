import React from "react";
import "./UpdateEditorSkeleton.css";

const UpdateEditorSkeleton = () => {
    return (
        <div className="update-form-skeleton">
            <h2 className="skeleton-title"></h2>

            {/* Title input */}
            <div className="skeleton-input"></div>

            {/* Category input */}
            <div className="skeleton-input"></div>

            {/* Editor content area */}
            <div className="skeleton-editor"></div>

            {/* Buttons */}
            <div className="skeleton-button"></div>
            <div className="skeleton-button back"></div>
        </div>
    );
};

export default UpdateEditorSkeleton;
