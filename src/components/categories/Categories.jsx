import React from 'react';
import { motion } from 'framer-motion';
import './Categories.css';

const categories = [
    { name: 'Programming', emoji: '💻' },
    { name: 'Tech', emoji: '🔧' },
    { name: 'Education', emoji: '📚' },
    { name: 'AI', emoji: '🤖' },
    { name: 'Science', emoji: '🔬' },
    { name: 'Health', emoji: '💊' },
    { name: 'Travel', emoji: '✈️' },
    { name: 'Finance', emoji: '💰' },
    { name: 'Food', emoji: '🍔' }
];

const Categories = () => {
    const repeatedCategories = [...categories, ...categories]; // Duplicate the list

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
         className="categories-section">
            <div className="categories-header">
                <h2>Explore Categories</h2>
                <p>Select a topic to discover or write articles in.</p>
            </div>
            <div className="carousel-wrapper">
                <motion.div
                    className="categories-carousel"
                    animate={{ x: ['0%', '-50%'] }} // animate halfway of total width
                    transition={{
                        duration: 30,
                        ease: 'linear',
                        repeat: Infinity
                    }}
                >
                    {repeatedCategories.map((cat, index) => (
                        <div className="category-card" key={index}>
                            <span className="category-emoji">{cat.emoji}</span>
                            <h3>{cat.name}</h3>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Categories;
