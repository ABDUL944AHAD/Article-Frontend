// src/pages/createArticle.jsx

// import React from 'react';
import ArticleForm from '../components/article editor/ArticleForm';

const CreateArticlePage = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create New Article</h1>
            <ArticleForm />
        </div>
    );
};

export default CreateArticlePage;
