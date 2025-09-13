import React, { useState } from 'react';
import axios from 'axios';
import './AllArticles.css';
import { Link } from 'react-router-dom';
import SkeletonCard from '../../Skeleton/Skeleton';
import { API_BASE_URL } from '../../../config/Config';

// ✅ Import animation utilities
import { motion } from 'framer-motion';
import {
    allArticlesHeaderVariants,
    allArticlesButtonVariants,
    sampleArticleCardVariants,
    allArticlesContainerVariants
} from '../../../utils/animation';

const MotionLink = motion(Link);

const sampleArticles = [
    {
        id: 1,
        articleName: "Streetwear Meets Elegance: The 2025 Bold Prints Trend",
        authorName: "Sara Khan",
        avatar: "/avatars/ladki.png",
        excerpt: "Oversized fits and bold prints are transforming streetwear into chic, everyday style.",
        category: "Fashion"
    },
    {
        id: 2,
        articleName: "The Quantum Leap in Computing",
        authorName: "Ali Mirza",
        avatar: "/avatars/samar.png",
        excerpt: "Quantum computers are moving from labs to real-world use, reshaping innovation.",
        category: "Science"
    },
    {
        id: 3,
        articleName: "Rising Digital Nomad Hotspots of 2025",
        authorName: "Nida Raza",
        avatar: "/avatars/nida.png",
        excerpt: "Remote workers are chasing sunsets in Bali, Lisbon, and Seoul while earning online and enjoying.",
        category: "Finance"
    },
    {
        id: 4,
        articleName: "SpaceX and the New Space Race",
        authorName: "Tariq Bilal",
        avatar: "/avatars/kamran.png",
        excerpt: "Interest in Mars missions and interstellar travel is surging, as new discoveries and innovations ",
        category: "Science"
    }
];

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSamples, setShowSamples] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const loadMoreArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/articles/get`);
            const fetchedArticles = response.data.data;

            const filteredArticles = fetchedArticles.filter(
                (article) =>
                    article.articleName &&
                    article.authorName &&
                    article.articleContent
            );

            setArticles(filteredArticles);
            setShowSamples(false); // ✅ switch to backend
            setSelectedCategory('All');
        } catch (error) {
            console.error("Error loading articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const showLessArticles = () => {
        setArticles([]); // clear backend
        setShowSamples(true); // ✅ force samples
        setSelectedCategory('All');
    };

    // ✅ Always prefer samples when showSamples = true
    const combinedArticles = showSamples ? [...sampleArticles] : [...articles];

    // ✅ Build categories fresh each render
    const categories = [
        'All',
        ...Array.from(
            new Set(
                combinedArticles.map(
                    (article) => article.category || 'Uncategorized'
                )
            )
        )
    ];

    const filteredArticles = selectedCategory === 'All'
        ? combinedArticles
        : combinedArticles.filter(article => article.category === selectedCategory);

    const stripHtmlTags = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    return (
        <div className="all-articles" id='all-articles'>
            {/* ✅ Animate header */}
            <motion.div
                className="articles-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={allArticlesHeaderVariants}
            >
                <h2>Latest Articles</h2>
                <p>Browse our latest insights, tutorials, and educational write-ups.</p>

                <div className="category-buttons">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                backgroundColor: selectedCategory === cat ? '#2563EB' : '#F1F5F9',
                                color: selectedCategory === cat ? '#ffffff' : '#0F172A',
                                border: selectedCategory === cat ? 'none' : '1px solid #CBD5E1',
                                borderRadius: '0.75rem',
                                fontFamily: 'Playwrite AU QLD',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: selectedCategory === cat ? '0 4px 10px rgba(37, 99, 235, 0.3)' : 'none',
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.backgroundColor = '#E2E8F0';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.backgroundColor = '#F1F5F9';
                                }
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ✅ Articles grid */}
            <motion.div
                // Add a key that changes when the article source changes
                key={showSamples ? 'samples' : 'backend'}
                className="allarticles-grid"
                variants={allArticlesContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                    : filteredArticles.length > 0
                        ? filteredArticles.map((article) => {
                            // ... rest of your mapping logic ...
                            const isSample = showSamples;
                            return (
                                <MotionLink
                                    className={`article-card ${!showSamples ? "backend-article" : ""}`}
                                    key={article._id || article.id}
                                    to={`/article/${article._id || article.id}`}
                                    {...(isSample ? { variants: sampleArticleCardVariants } : {})}
                                >
                                    {article.images && article.images.length > 0 && (
                                        <img
                                            src={article.images[0]}
                                            alt={article.articleName}
                                            className="article-thumbnail"
                                        />
                                    )}

                                    <div className="article-content">
                                        <h3>{article.articleName}</h3>
                                        <p>
                                            {article.excerpt
                                                ? article.excerpt
                                                : `${stripHtmlTags(article.articleContent)?.slice(0, 120)}...`}
                                        </p>
                                        <div className="article-footer">
                                            {article.avatar && (
                                                <img
                                                    src={article.avatar}
                                                    alt={article.authorName}
                                                    className="author-avatar"
                                                />
                                            )}
                                            <span>{article.authorName}</span>
                                        </div>
                                    </div>
                                </MotionLink>
                            );
                            
                        })
                        : (
                            <p style={{ fontFamily: "Playwrite AU QLD" }}>
                                No articles found in this category.
                            </p>
                        )
                }
            </motion.div>

            {/* ✅ Bottom buttons */}
            <motion.div
                style={{ marginTop: '2rem' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={allArticlesButtonVariants}
            >
                {showSamples ? (
                    <button
                        onClick={loadMoreArticles}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#2563EB',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontFamily: 'Playwrite AU QLD',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <button
                        onClick={showLessArticles}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#1E40AF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontFamily: 'Playwrite AU QLD',
                            cursor: 'pointer'
                        }}
                    >
                        Show Less
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default AllArticles;
