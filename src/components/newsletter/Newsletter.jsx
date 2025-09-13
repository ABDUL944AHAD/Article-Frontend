import React, { useState } from "react";
import { motion } from "framer-motion";
import Toast from "../Toaster/Toast"; // adjust path
import "./Newsletter.css";

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

function Newsletter() {
    const [email, setEmail] = useState("");
    const [toasts, setToasts] = useState([]);

    const handleSubscribe = (e) => {
        e.preventDefault();

        // Add a toast message
        const id = Date.now();
        setToasts([...toasts, {
            id,
            message: `Thanks for subscribing! You will receive an email shortly.`,
        }]);

        setEmail("");
    };

    const removeToast = (id) => {
        setToasts(toasts.filter(t => t.id !== id));
    };

    return (
        <motion.section
            className="newsletter-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="newsletter-content" variants={containerVariants}>
                <h2>Stay Updated!</h2>
                <p>
                    Subscribe to our newsletter and never miss a new article or update.
                </p>

                <motion.form
                    onSubmit={handleSubscribe}
                    className="newsletter-form"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        whileFocus={{ scale: 1.02, borderColor: "#2563EB" }}
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Subscribe
                    </motion.button>
                </motion.form>
            </motion.div>

            {/* Toast container */}
            <div className="toast-container">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </div>
        </motion.section>
    );
}

export default Newsletter;
