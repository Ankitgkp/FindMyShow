import React from "react";

const MovieSection = ({ title, movies }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {movies.map((movie, index) => (
                    <div key={index} className="min-w-[150px] text-center text-white">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-[150px] h-[220px] object-cover rounded-md"
                        />
                        <p className="mt-2 text-sm font-medium">{movie.title}</p>
                        <p className="text-xs text-gray-400">{movie.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSection;
