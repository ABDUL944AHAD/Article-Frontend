
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import TiptapEditor from "../UpdateEditor/TipTap/TipTap";
import Toast from "../../components/Toaster/Toast";
import "./UpdateEditor.css";
import UpdateEditorSkeleton from "../../components/Skeleton/UpdateEditorSkeleton";

const UpdateEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [article, setArticle] = useState({
        articleName: "",
        category: "",
        articleContent: "",
        images: [],
    });
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState([]);

    // Fetch article
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/articles/get/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.data;
                setArticle({
                    articleName: data.articleName,
                    category: data.category,
                    articleContent: data.articleContent,
                    images: data.images || [],
                });
            } catch (err) {
                addToast("Failed to load article.", "update-editor");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchArticle();
        } else {
            addToast("Unauthorized. Please log in again.", "update-editor");
            navigate("/login");
        }
    }, [id, token, navigate]);

    // Toast helpers
    const addToast = (message, type = "update-editor", duration = 4000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (html) => {
        setArticle((prev) => ({ ...prev, articleContent: html }));
    };

    const handleImagesChange = (images) => {
        setArticle((prev) => ({ ...prev, images }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${API_BASE_URL}/articles/update/${id}`,
                article,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            addToast("Article updated successfully!", "update-editor",3000 );

            // Wait for 4 seconds before redirecting
            setTimeout(() => {
                navigate("/dashboard");
            },1000 );

        } catch (err) {
            console.error("Update error:", err);
            addToast("Failed to update article.", "update-editor", 4000);
        }
    };

    if (loading) return <UpdateEditorSkeleton/>;

    return (
        <div className="update-form">
            <h2>Edit Article</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="articleName">Title</label>
                    <input
                        id="articleName"
                        type="text"
                        name="articleName"
                        value={article.articleName}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={article.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <TiptapEditor
                        onChange={handleEditorChange}
                        onImagesChange={handleImagesChange}
                        initialContent={article.articleContent}
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>

            <button className="back-btn" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

            {/* Toast container */}
            <div className="toast-container">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        type={t.type}
                        onClose={() => removeToast(t.id)}
                        duration={t.duration}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpdateEditor;
