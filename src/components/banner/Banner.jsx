// Banner.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Banner.css";

const textVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Banner() {
    return (
        <motion.section
            className="banner-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="banner-content" variants={textVariants}>
                <h2>Join Our Community of Knowledge Seekers</h2>
                <p>
                    Discover, write, and explore articles that inspire and educate.
                    Start contributing and make your voice heard!
                </p>
                <motion.button
                    className="banner-cta"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Writing
                </motion.button>
            </motion.div>

            <motion.div className="banner-image" variants={imageVariants}>
                <img
                    src="https://miro.medium.com/v2/resize:fit:1400/1*JCo7t_aIpbsKhifmPEDqpw.jpeg"
                    alt="Banner Illustration"
                />
            </motion.div>
        </motion.section>
    );
}

export default Banner;
