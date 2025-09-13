// Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./Footer.css";

const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

function Footer() {
    return (
        <motion.footer
            className="footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={footerVariants}
        >
            <div className="footer-container">
                {/* Brand + tagline */}
                <div className="footer-brand">
                    <h3 className="footer-logo">DevWrite</h3>
                    <p className="footer-tagline">Your space to write, share & inspire.</p>
                </div>

                {/* Social icons */}
                <div className="footer-socials">
                    {[
                        { icon: <FaFacebookF />, label: "Facebook" },
                        { icon: <FaTwitter />, label: "Twitter" },
                        { icon: <FaLinkedinIn />, label: "LinkedIn" },
                        { icon: <FaGithub />, label: "GitHub" },
                    ].map((social, idx) => (
                        <motion.a
                            key={idx}
                            href="#"
                            aria-label={social.label}
                            whileHover={{ scale: 1.2, color: "#2563EB" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Bottom line */}
            <motion.div
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <p>© {new Date().getFullYear()} DevWrite. All rights reserved.</p>
            </motion.div>
        </motion.footer>
    );
}

export default Footer;
