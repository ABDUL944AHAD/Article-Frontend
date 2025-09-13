import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import "./DashArticleDetail.css";
import ArticleDetailSkeleton from "../../components/Skeleton/DetailSkeleton";

const DashboardArticleDetail = ({ role, token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const url =
                    role === "admin"
                        ? `${API_BASE_URL}/admin/articles/${id}`
                        : `${API_BASE_URL}/articles/get/${id}`;

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data.data || res.data;
                setArticle(data);
            } catch (err) {
                console.error("Error fetching article:", err);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id, token, role]);

    const deleteArticle = async () => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;
        try {
            const url =
                role === "admin"
                    ? `${API_BASE_URL}/admin/articles/${id}`
                    : `${API_BASE_URL}/articles/delete/${id}`;
            await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
            navigate("/dashboard/articles");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete article.");
        }
    };

    if (loading) return <ArticleDetailSkeleton/>;
    if (!article) return <p>Article not found.</p>;

    // Remove first image from content if it matches the cover
    const cleanedContent = (() => {
        if (!article.articleContent) return "";
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = article.articleContent;
        const imgs = tempDiv.querySelectorAll("img");
        if (imgs.length > 0 && article.images?.length > 0) {
            if (imgs[0].src === article.images[0]) {
                imgs[0].remove();
            }
        }
        return tempDiv.innerHTML;
    })();

    return (
        <div className="dashboard-article-detail">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

            <div className="dashboard-detail-header">
                <h2>{article.articleName}</h2>
                <div className="dashboard-detail-actions">
                    <button onClick={() => navigate(`/editor/${id}`)}>Update</button>
                    <button className="delete-btn" onClick={deleteArticle}>
                        Delete
                    </button>
                </div>
            </div>

            <p className="dashboard-article-meta">
                By {article.authorName} | {new Date(article.createdAt).toLocaleDateString()}
            </p>

            {article.images?.length > 0 && (
                <img
                    src={article.images[0]}
                    alt={article.articleName}
                    className="dashboard-article-cover"
                />
            )}

            <div
                className="dashboard-detail-content"
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />
        </div>
    );
};

export default DashboardArticleDetail;
