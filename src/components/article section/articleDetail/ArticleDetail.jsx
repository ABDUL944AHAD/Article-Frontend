import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ArticleDetail.css";
import ArticleDetailSkeleton from "../../Skeleton/DetailSkeleton";
import { API_BASE_URL } from "../../../config/Config";
function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // instantly jumps to top
        // fetch article by id
        axios
            .get(`${API_BASE_URL}/articles/get/${id}`)
            .then((res) => setArticle(res.data))
            .catch((err) => console.error("Error fetching article:", err));
    }, [id]);


    useEffect(() => {
        if (article?._id) {
            axios
                .get(`${API_BASE_URL}/articles/related/${article._id}`)
                .then((res) => {
                    console.log("Related articles:", res.data);
                    setRelatedArticles(res.data);
                })
                .catch((err) => console.error("Error fetching related articles:", err));
        }
    }, [article]);

    
    if (!article)
        return <ArticleDetailSkeleton/>
    

    // sharing URLs
    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(article.articleName);

    return (
        <div className="article-detail">
            <h1 className="article-title">{article.articleName}</h1>

            <p className="article-meta">
                By <span className="article-author">{article.authorName}</span> |{" "}
                {article.category}
            </p>

            {article.images && article.images.length > 0 && (
                <img
                    src={article.images[0]}
                    alt={article.articleName}
                    className="article-cover"
                />
            )}

            {/* <div className="article-text" dangerouslySetInnerHTML={{ __html: article.articleContent }}>
                {article.articleContent.split("\n\n").map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div> */}

            <div className="article-text">
                <div
                    dangerouslySetInnerHTML={{
                        __html: (() => {
                            if (!article.articleContent) return "";
                            // Remove the first image src if it exists
                            const tempDiv = document.createElement("div");
                            tempDiv.innerHTML = article.articleContent;
                            const imgs = tempDiv.querySelectorAll("img");
                            if (imgs.length > 0 && imgs[0].src === article.images[0]) {
                                imgs[0].remove(); // remove the first image from content
                            }
                            return tempDiv.innerHTML;
                        })(),
                    }}
                />
            </div>


            {/* ✅ Social Share Buttons */}
            <div className="social-share">
                <p>Share this article:</p>
                <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
            </div>

            {/* ✅ Related Articles Section */}
            {relatedArticles.length > 0 && (
                <div className="related-articles">
                    <h2>Related Articles</h2>
                    <div className="related-list">
                        {relatedArticles.map((ra) => (
                            <Link
                                key={ra._id}
                                to={`/article/${ra._id}`}
                                className="related-card"
                            >
                                {ra.images && ra.images.length > 0 && (
                                    <img
                                        src={ra.images[0]}
                                        alt={ra.articleName}
                                        className="related-thumbnail"
                                    />
                                )}
                                <div className="related-info">
                                    <h3>{ra.articleName}</h3>
                                    <p>By {ra.authorName}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default ArticleDetail;
