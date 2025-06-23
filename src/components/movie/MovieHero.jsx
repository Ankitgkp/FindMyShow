import React from "react";
import { FaStar, FaPlay } from "react-icons/fa";

const MovieHero = ({ movie, formatRuntime, trailer }) => {
    return (
        <div
            className="w-full h-[60vh] bg-cover bg-center relative"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : 'linear-gradient(to bottom, #13171f, #0f1115)',
                backgroundBlendMode: "darken"
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,17,21,0.2)] via-[rgba(15,17,21,0.7)] to-[#0f1115]"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://placehold.co/300x450/13171f/cccccc?text=No+Poster'
                        }
                        alt={movie.title}
                        className="w-40 h-60 md:w-52 md:h-72 rounded-md shadow-lg object-cover object-center"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-3">
                            {movie.title} <span className="text-gray-400 font-normal">({movie.release_date?.slice(0, 4) || "N/A"})</span>
                        </h1>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full">
                                <FaStar className="text-yellow-400" />
                                <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                            </div>

                            <span className="text-gray-400">{formatRuntime(movie.runtime)}</span>

                            <div className="flex flex-wrap gap-2">
                                {movie.genres?.slice(0, 3).map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="py-1 px-3 bg-[rgba(255,255,255,0.1)] rounded-full text-xs"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {trailer && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded text-white font-medium transition"
                            >
                                <FaPlay /> Watch Trailer
                            </a>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-[rgba(0,0,0,0.5)] p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-cyan-400">#{movie.popularity?.toFixed(0) || "N/A"}</div>
                            <div className="text-sm text-gray-300">Popularity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;
