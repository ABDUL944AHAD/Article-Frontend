// Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Testimonial.css";

const testimonialsData = [
    {
        name: "Khalil Latif",
        text: "This platform changed the way I learn programming. The articles are clear and practical!",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60",
    },
    {
        name: "Sara Ahmed",
        text: "I love writing here! It's easy, fun, and my articles reach thousands of readers.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
    },
    {
        name: "Ali Khan",
        text: "The user interface is beautiful and intuitive. Reading articles here is a joy!",
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    },
];

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

function Testimonials() {
    return (
        <motion.section
            className="testimonials"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h2 variants={sectionVariants}>What Our Readers Say</motion.h2>

            <div className="testimonial-cards">
                {testimonialsData.map((t, index) => (
                    <motion.div
                        className="testimonial-card"
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={index}
                    >
                        <p>"{t.text}"</p>
                        <div className="testimonial-author">
                            {t.avatar && <img src={t.avatar} alt={t.name} />}
                            <h3>{t.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default Testimonials;
