import React, { useState, useEffect } from "react";
import axios from "axios";
import SkeletonCard from "../../components/Skeleton/Skeleton";
import "./AllArticles.css";
import { API_BASE_URL } from "../../config/Config";
import { useNavigate } from "react-router-dom";

const AllArticles = ({ role, token }) => {
    const INITIAL_COUNT = 6;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // saved on login

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const url =
                    role === "admin"
                        ? `${API_BASE_URL}/admin/articles`
                        : `${API_BASE_URL}/articles/my`;

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = role === "admin" ? res.data : res.data.data;
                setArticles(data);
            } catch (err) {
                console.error("Error fetching articles:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [role, token]);

    const deleteArticle = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            const url =
                role === "admin"
                    ? `${API_BASE_URL}/admin/articles/${id}`
                    : `${API_BASE_URL}/articles/delete/${id}`;

            await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
            setArticles((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete article.");
        }
    };

    const updateArticle = (article) => {
        window.location.href = `/editor/${article._id}`;
    };

    const openDetail = (id) => {
        navigate(`/dashboard/articles/${id}`);
    };

    const categories = [
        "All",
        ...Array.from(new Set(articles.map((a) => a.category || "Other"))),
    ];

    const filteredArticles =
        selectedCategory === "All"
            ? articles
            : articles.filter((a) => (a.category || "Other") === selectedCategory);

    const visibleArticles = filteredArticles.slice(0, visibleCount);

    const stripHtml = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    return (
        <div className="dashboard-articles">
            <div className="dashboard-articles-header">
                <h2>All Articles</h2>
                <p>Browse the latest articles.</p>

                <div className="dashboard-category-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? "active" : ""}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dashboard-articles-grid">
                {loading
                    ? Array.from({ length: INITIAL_COUNT }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : visibleArticles.length > 0
                        ? visibleArticles.map((article) => (
                            <div
                                key={article._id}
                                className="dashboard-article-card"
                                onClick={() => openDetail(article._id)}
                                style={{ cursor: "pointer" }}
                            >
                                {article.images?.[0] && (
                                    <img
                                        src={article.images[0]}
                                        alt={article.articleName}
                                        className="dashboard-article-thumbnail"
                                    />
                                )}
                                <div className="dashboard-article-content">
                                    <h3>{article.articleName}</h3>
                                    <p>{stripHtml(article.articleContent).slice(0, 120)}...</p>
                                    <div className="dashboard-article-footer">
                                        {article.avatar && (
                                            <img
                                                src={article.avatar}
                                                alt={article.authorName}
                                                className="dashboard-author-avatar"
                                            />
                                        )}
                                        <span className="dashboard-author-name">{article.authorName}</span>

                                        {/* Show update/delete buttons for admin or article owner */}
                                        {(role === "admin" || article.createdBy === userId) && (
                                            <div
                                                className="dashboard-footer-actions"
                                                style={{ marginLeft: "auto" }}
                                                onClick={(e) => e.stopPropagation()} // prevent card click
                                            >
                                                <button onClick={() => updateArticle(article)}>Update</button>
                                                <button
                                                    className="dashboard-delete-button"
                                                    onClick={() => deleteArticle(article._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>No articles found in this category.</p>}
            </div>

            <div className="dashboard-articles-buttons">
                <button
                    className={`dashboard-load-more-btn ${visibleCount < filteredArticles.length ? "visible" : "hidden"
                        }`}
                    onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
                >
                    Load More
                </button>

                <button
                    className={`dashboard-show-less-btn ${visibleCount > INITIAL_COUNT ? "visible" : "hidden"
                        }`}
                    onClick={() => setVisibleCount(INITIAL_COUNT)}
                >
                    Show Less
                </button>
            </div>
        </div>
    );
};

export default AllArticles;
