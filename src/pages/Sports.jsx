import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookmarkButton from '../components/BookmarkButton';
import { movieAPI } from '../api/movieAPI';

const Sports = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSportsMovies = async () => {
            try {
                const data = await movieAPI.getSportsMovies();
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sports movies:', error);
                setLoading(false);
            }
        };

        fetchSportsMovies();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#0f1115]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
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
                    <h1 className="text-3xl font-bold mb-2">Sports Movies</h1>
                    <p className="text-gray-400">Movies about sports, athletes, and competition</p>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold mb-2 text-gray-400">No sports movies found</h2>
                        <p className="text-gray-500 mb-6">Try checking back later or browse other categories</p>
                        <Link
                            to="/"
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                            Browse All Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
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

                                        <BookmarkButton
                                            movie={movie}
                                            className="absolute top-2 right-2"
                                        />

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

export default Sports;
