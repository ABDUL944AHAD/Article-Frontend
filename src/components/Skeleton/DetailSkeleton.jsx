// src/components/ArticleDetailSkeleton.jsx
import React from "react";
import "./DetailSkeleton.css";

const ArticleDetailSkeleton = () => {
    return (
        <div className="article-detail-skeleton">
            {/* Title */}
            <div className="skeleton skeleton-title"></div>

            {/* Author / meta */}
            <div className="skeleton skeleton-meta"></div>

            {/* Cover image */}
            <div className="skeleton skeleton-image"></div>

            {/* Article content blocks */}
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text short"></div>
        </div>
    );
};

export default ArticleDetailSkeleton;
