import React from 'react';

const MovieStats = ({ movie }) => {
    return (
        <div className="bg-[#13171f] p-5 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-4 text-cyan-500">Movie Stats</h3>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded">
                    <div className="text-xl font-bold text-yellow-400">{movie.vote_average?.toFixed(1)}</div>
                    <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded">
                    <div className="text-xl font-bold text-cyan-400">{movie.vote_count}</div>
                    <div className="text-sm text-gray-400">Votes</div>
                </div>
                <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded">
                    <div className="text-xl font-bold text-gray-300">{movie.popularity?.toFixed(0)}</div>
                    <div className="text-sm text-gray-400">Popularity</div>
                </div>
                <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded">
                    <div className="text-xl font-bold text-green-400">{movie.status}</div>
                    <div className="text-sm text-gray-400">Status</div>
                </div>
            </div>
        </div>
    );
};

export default MovieStats;
