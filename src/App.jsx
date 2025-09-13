import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import Categories from './components/categories/Categories';
import FeaturedArticles from './components/article section/featuredArticles/FeaturedArticles';
import AllArticles from './components/article section/allArticles/AllArticles';
import ArticleForm from './components/article editor/ArticleForm';
import ArticleDetail from './components/article section/articleDetail/ArticleDetail';
import Testimonials from './components/testimonial/Testimonial';
import Banner from './components/banner/Banner';
import Newsletter from './components/newsletter/Newsletter';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import DashboardLayout from './Dashboard/Dashboard';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import ProtectedRoute from './utils/ProtectedRoutes';
import RouteWatcher from './utils/RouteWatcher';   // 👈 import
import UpdateEditor from './Dashboard/UpdateEditor/UpdateEditor';
import DashboardArticleDetail from './Dashboard/DashArticleDetail/DashArticleDetail'

function HomePage() {
  return (
    <>
      <Navbar sticky={false} />
      <HeroSection />
      <Categories />
      <FeaturedArticles />
      <AllArticles />
      <Testimonials />
      <Banner />
      <Newsletter />
      <Footer />
    </>
  );
}

function CreateArticlePage() {
  return (
    <>
      <Navbar sticky={false} />
      <ArticleForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteWatcher />   {/* 👈 listens for route changes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path="/article/:id" element={<><Navbar sticky={false} /><ArticleDetail /></>} />
        <Route path="/login" element={<><Navbar sticky={false} /><Login /></>} />
        <Route path="/signup" element={<><Navbar sticky={false} /><Signup /></>} />
        <Route path="/editor/:id" element={<UpdateEditor />} />


        {/* Dashboard route with sticky navbar */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />
        {/* Article Detail for Dashboard */}
        <Route
          path="/dashboard/articles/:id"
          element={<DashboardArticleDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
