import React from 'react';
import { motion } from 'framer-motion';
import { useBookmarks } from '../contexts/BookmarksContext';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { FiHeart, FiBookmark } from 'react-icons/fi';

const Bookmarks = () => {
    const { bookmarks, toggleBookmark, isSignedIn } = useBookmarks();
    const { user } = useUser();

    if (!isSignedIn) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-screen bg-[#0a0d12] text-white pt-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
                    <p className="text-gray-400">You need to sign in to view your bookmarked movies.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen bg-[#0a0d12] text-white pt-20 px-6"
        >
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
                    <p className="text-gray-400">
                        Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
                        Here are your saved movies.
                    </p>
                </div>

                {bookmarks.length === 0 ? (
                    <div className="text-center py-20">
                        <FiBookmark className="text-6xl text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2 text-gray-400">No bookmarks yet</h2>
                        <p className="text-gray-500 mb-6">Start browsing and bookmark your favorite movies!</p>
                        <Link
                            to="/"
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {bookmarks.map((movie) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative group"
                            >
                                <Link to={`/movie/${movie.id}`}>
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                                        {/* Bookmark button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleBookmark(movie);
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 rounded-full text-cyan-500 hover:text-cyan-400 transition-colors"
                                        >
                                            <FiBookmark className="fill-current" />
                                        </button>

                                        {/* Movie info overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <h3 className="text-sm font-semibold mb-1 line-clamp-2">{movie.title}</h3>
                                            <p className="text-xs text-gray-300">
                                                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                            </p>
                                            {movie.vote_average && (
                                                <div className="flex items-center mt-1">
                                                    <span className="text-xs text-yellow-400">★</span>
                                                    <span className="text-xs ml-1">{movie.vote_average.toFixed(1)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Bookmarks;
