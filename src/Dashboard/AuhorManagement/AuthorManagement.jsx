import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import Toast from "../../components/Toaster/Toast"; // adjust path
import "./AuthorManagement.css";

const AuthorManagement = ({ token }) => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        fetchAuthors();
    }, [token]);

    const fetchAuthors = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/authors`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAuthors(res.data || []);
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to fetch authors", "error");
        } finally {
            setLoading(false);
        }
    };

    const addToast = (message, type = "default", actions = null) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, actions }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const handleDelete = (authorId) => {
        // Instead of window.confirm, show a toast with Confirm/Cancel buttons
        addToast(`Are you sure you want to delete this author?`, "default", [
            {
                label: "Confirm",
                onClick: async () => {
                    removeToast(Date.now()); // remove the confirmation toast
                    await confirmDelete(authorId);
                },
            },
            {
                label: "Cancel",
                onClick: () => {
                    removeToast(Date.now()); // remove the confirmation toast
                },
            },
        ]);
    };

    const confirmDelete = async (id) => {
        try {
            setDeleting(id);

            await axios.delete(`${API_BASE_URL}/admin/authors/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setAuthors((prev) => prev.filter((author) => author._id !== id));
            addToast("Author deleted successfully", "success");
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to delete author", "error");
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="author-management">
            <h2 className="author-management-title">Author Management</h2>

            {loading ? (
                <p className="author-management-loading">Loading authors...</p>
            ) : authors.length === 0 ? (
                <p className="author-management-empty">No authors found</p>
            ) : (
                <div className="author-table-wrapper">
                    <table className="author-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined / Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author._id}>
                                    <td data-label="Name">
                                        {author.name || author.username || "N/A"}
                                    </td>
                                    <td data-label="Email">{author.email}</td>
                                    <td data-label="Role">
                                        <span
                                            className={`role-badge ${author.role === "admin" ? "admin" : "author"
                                                }`}
                                        >
                                            {author.role}
                                        </span>
                                    </td>
                                    <td data-label="Joined / Last Login">
                                        {author.createdAt
                                            ? new Date(author.createdAt).toLocaleDateString()
                                            : author.lastLogin
                                                ? new Date(author.lastLogin).toLocaleDateString()
                                                : "N/A"}
                                    </td>
                                    <td data-label="Actions">
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(author._id)}
                                            disabled={deleting === author._id}
                                        >
                                            {deleting === author._id ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Toast container */}
            <div className="toast-container">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        type={t.type}
                        actions={t.actions} // pass actions prop
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthorManagement;
