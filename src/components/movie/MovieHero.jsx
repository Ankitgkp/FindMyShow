import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaClock, FaPlay } from "react-icons/fa";

const MovieHero = ({ movie, formatRuntime, trailer }) => {
    return (
        <motion.div
            className="w-full h-[50vh] md:h-[70vh] bg-cover bg-center relative"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : 'linear-gradient(to bottom, #13171f, #0f1115)',
                backgroundBlendMode: "darken"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(15,17,21,0.7)] to-[#0f1115]"></div>

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <motion.div
                        className="mx-auto md:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : 'https://placehold.co/300x450/13171f/cccccc?text=No+Poster'
                            }
                            alt={movie.title}
                            className="w-36 h-52 md:w-48 md:h-72 rounded-md shadow-lg object-cover object-center"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-end text-center md:text-left">
                        <motion.h1
                            className="text-2xl md:text-4xl font-bold mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {movie.title}
                        </motion.h1>

                        <motion.div
                            className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-sm mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                <span>{movie.vote_average?.toFixed(1)} / 10</span>
                            </div>

                            <span className="hidden md:inline">•</span>

                            <div className="flex items-center gap-1">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
                            </div>

                            <span className="hidden md:inline">•</span>

                            <div className="flex items-center gap-1">
                                <FaClock className="text-gray-400" />
                                <span>{formatRuntime(movie.runtime)}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center md:justify-start gap-2 mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            {movie.genres?.map((genre, index) => (
                                <motion.span
                                    key={genre.id}
                                    className="py-1 px-3 bg-[rgba(255,255,255,0.1)] rounded-full text-xs"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (index * 0.05), duration: 0.3 }}
                                >
                                    {genre.name}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.p
                            className="text-gray-300 mb-4 max-w-2xl line-clamp-3 md:line-clamp-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            {movie.overview}
                        </motion.p>

                        {trailer && (
                            <motion.div
                                className="flex justify-center md:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <motion.a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded text-white font-medium transition w-fit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaPlay /> Watch Trailer
                                </motion.a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieHero;
