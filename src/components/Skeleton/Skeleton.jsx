// SkeletonCard.jsx
import React from "react";
import "./Skeleton.css";

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton thumbnail"></div>
            <div className="skeleton title"></div>
            <div className="skeleton line"></div>
            <div className="skeleton line short"></div>
        </div>
    );
}

export default SkeletonCard;
