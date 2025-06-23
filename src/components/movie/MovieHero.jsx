import React from "react";
import { FaStar, FaCalendarAlt, FaClock, FaPlay } from "react-icons/fa";

const MovieHero = ({ movie, formatRuntime, trailer }) => {
    return (
        <div
            className="w-full h-[50vh] md:h-[70vh] bg-cover bg-center relative"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : 'linear-gradient(to bottom, #13171f, #0f1115)',
                backgroundBlendMode: "darken"
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(15,17,21,0.7)] to-[#0f1115]"></div>

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="mx-auto md:mx-0">
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : 'https://placehold.co/300x450/13171f/cccccc?text=No+Poster'
                            }
                            alt={movie.title}
                            className="w-36 h-52 md:w-48 md:h-72 rounded-md shadow-lg object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col justify-end text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-sm mb-4">
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
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="py-1 px-3 bg-[rgba(255,255,255,0.1)] rounded-full text-xs"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-300 mb-4 max-w-2xl line-clamp-3 md:line-clamp-none">
                            {movie.overview}
                        </p>

                        {trailer && (
                            <div className="flex justify-center md:justify-start">
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded text-white font-medium transition w-fit"
                                >
                                    <FaPlay /> Watch Trailer
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;
