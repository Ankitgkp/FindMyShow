import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BookmarkButton from "./BookmarkButton";

const MovieSection = ({ title, movies }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };


    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-8 relative">
            <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>

            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>

                <div className="group relative overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {movies.map((movie, index) => (
                            <div
                                key={index}
                                className="min-w-[150px] text-center text-white cursor-pointer hover:opacity-80 hover:-translate-y-1 transition"
                                onClick={() => handleMovieClick(movie.id)}
                            >
                                <div className="relative w-[150px] h-[220px] overflow-hidden rounded-md">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                                        <span className="text-xs font-medium text-white">View Details</span>
                                    </div>

                                    <BookmarkButton
                                        movie={{
                                            id: movie.id,
                                            title: movie.title,
                                            poster_path: movie.poster_path || movie.poster?.replace('https://image.tmdb.org/t/p/w500', ''),
                                            release_date: movie.release_date,
                                            vote_average: movie.vote_average
                                        }}
                                        className="absolute top-2 right-2"
                                        size="sm"
                                    />
                                </div>
                                <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
                                <p className="text-xs text-gray-400">{movie.year}</p>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#0f1115] to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#0f1115] to-transparent pointer-events-none"></div>
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default MovieSection;
