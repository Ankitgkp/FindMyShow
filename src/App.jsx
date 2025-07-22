import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BookmarksProvider } from './contexts/BookmarksContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Bookmarks from './pages/Bookmarks';
import New from './pages/New';
import Popular from './pages/Popular';
import Lists from './pages/Lists';
import Sports from './pages/Sports';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/new" element={<New />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ToastProvider>
      <BookmarksProvider>
        <Router>
          <Navbar />
          <AnimatedRoutes />
        </Router>
      </BookmarksProvider>
    </ToastProvider>
  );
}

export default App;
