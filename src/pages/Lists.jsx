import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookmarkButton from '../components/BookmarkButton';
import { movieAPI } from '../api/movieAPI';

const Lists = () => {
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const [topRatedData, upcomingData] = await Promise.all([
                    movieAPI.getTopRatedMovies(),
                    movieAPI.getUpcomingMovies()
                ]);

                setTopRated(topRatedData.results.slice(0, 10));
                setUpcoming(upcomingData.results.slice(0, 10));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie lists:', error);
                setLoading(false);
            }
        };

        fetchLists();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#0f1115]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    const MovieGrid = ({ movies }) => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                            <BookmarkButton
                                movie={movie}
                                className="absolute top-2 right-2"
                                size="sm"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-xs font-semibold mb-1 line-clamp-2">{movie.title}</h3>
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
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen bg-[#0a0d12] text-white pt-20 px-6"
        >
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Movie Lists</h1>
                    <p className="text-gray-400">Curated collections of great movies</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2 text-cyan-500">Top Rated Movies</h2>
                            <p className="text-gray-400">Highest rated movies of all time</p>
                        </div>
                        <MovieGrid movies={topRated} />
                    </section>

                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2 text-cyan-500">Coming Soon</h2>
                            <p className="text-gray-400">Upcoming movies to look forward to</p>
                        </div>
                        <MovieGrid movies={upcoming} />
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default Lists;
