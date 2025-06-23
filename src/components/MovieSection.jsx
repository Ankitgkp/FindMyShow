import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieSection = ({ title, movies }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    // Auto-scroll configuration
    const autoScrollEnabled = movies.length > 5;
    const scrollSpeed = 0.5; // pixels per frame
    const scrollDelay = 3000; // ms before auto-scroll starts
    const pauseOnHover = true;

    // Auto-scroll functionality
    useEffect(() => {
        if (!autoScrollEnabled || !scrollContainerRef.current) return;

        let animationId;
        let scrolling = false;
        let lastTimestamp = 0;
        let hovering = false;

        const container = scrollContainerRef.current;

        const startScrolling = () => {
            if (scrolling) return;

            scrolling = true;
            lastTimestamp = performance.now();

            setTimeout(() => {
                animationId = requestAnimationFrame(scroll);
            }, scrollDelay);
        };

        const scroll = (timestamp) => {
            if (!scrolling || hovering) {
                animationId = requestAnimationFrame(scroll);
                return;
            }

            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            container.scrollLeft += scrollSpeed * deltaTime;

            // Reset to beginning when reached end
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
                container.scrollLeft = 0;
            }

            animationId = requestAnimationFrame(scroll);
        };

        const handleMouseEnter = () => {
            if (pauseOnHover) hovering = true;
        };

        const handleMouseLeave = () => {
            hovering = false;
        };

        // Add event listeners
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Start scrolling after a delay
        startScrolling();

        // Clean up
        return () => {
            cancelAnimationFrame(animationId);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [autoScrollEnabled, movies]);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    // Scroll functions for buttons
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

            {/* Navigation buttons */}
            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>

                {/* Main container - adding group for button visibility */}
                <div className="group relative overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {movies.map((movie, index) => (
                            <motion.div
                                key={index}
                                className="min-w-[150px] text-center text-white cursor-pointer"
                                onClick={() => handleMovieClick(movie.id)}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                    ease: "easeOut"
                                }}
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
                                </div>
                                <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
                                <p className="text-xs text-gray-400">{movie.year}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient overlays to indicate more content */}
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
