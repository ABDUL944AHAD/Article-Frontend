import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TiptapEditor from "./Editor";
import Toast from "../Toaster/Toast";
import PromptModal from "../promptModel/PromptModal";
import "./ArticleForm.css";
import { API_BASE_URL } from "../../config/Config";

const ArticleForm = () => {
    const [articleName, setArticleName] = useState("");
    const [category, setCategory] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [images, setImages] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [showPrompt, setShowPrompt] = useState(false); // 👈 modal state

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (storedUser && storedUser.name) {
            setAuthorName(storedUser.name);
        } 
    }, [storedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setShowPrompt(true); // 👈 open modal instead of toast
            return;
        }

        if (!articleName || !category || !articleContent) {
            setToastMessage("⚠️ Please fill in all fields");
            return;
        }

        try {
            await axios.post(
                `${API_BASE_URL}/articles/save`,
                { articleName, category, articleContent, images },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setToastMessage("🚀 Great job! Your article is published.");
            setArticleName("");
            setCategory("");
            setArticleContent("");
            setImages([]);

            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (error) {
            console.error("Submission error:", error);
            setToastMessage("❌ Error submitting article");
        }
    };

    return (
        <>
            <form className="article-form" onSubmit={handleSubmit}>
                <h2>Create New Article</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author Name"
                    value={authorName || ""}
                    readOnly
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Tech">Tech</option>
                    <option value="Education">Education</option>
                    <option value="Science">Science</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Progress">Progress</option>
                </select>

                <TiptapEditor onChange={setArticleContent} onImagesChange={setImages} />

                <button type="submit">
                    {token ? "Publish Article" : "Login to Publish"}
                </button>
            </form>

            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            )}

            {/* Modal prompt */}
            <PromptModal
                open={showPrompt}
                onClose={() => setShowPrompt(false)}
                onConfirm={() => navigate("/login")}
            />
        </>
    );
};

export default ArticleForm;
