import React from 'react';

const MovieDetails = ({ movie, director, formatRuntime, formatMoney }) => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-cyan-500">Movie Details</h2>
            <div className="bg-[#13171f] rounded-lg p-5 space-y-4">
                {director && (
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <span className="text-gray-400">Director</span>
                        <span>{director.name}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Release Date</span>
                    <span>{movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : "N/A"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Runtime</span>
                    <span>{formatRuntime(movie.runtime)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Status</span>
                    <span>{movie.status || "N/A"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Original Language</span>
                    <span>{movie.original_language?.toUpperCase() || "N/A"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Budget</span>
                    <span>{formatMoney(movie.budget)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <span className="text-gray-400">Revenue</span>
                    <span>{formatMoney(movie.revenue)}</span>
                </div>
            </div>
        </section>
    );
};

export default MovieDetails;
