import React from 'react';
import MovieDetailsInfo from './MovieDetailsInfo';
import MovieStats from './MovieStats';
import QuickProviders from './QuickProviders';

const MovieOverview = ({ movie, director, formatRuntime, formatMoney, watchProviders }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
                    <p className="text-gray-300">{movie.overview}</p>
                </div>

                <MovieDetailsInfo
                    movie={movie}
                    director={director}
                    formatRuntime={formatRuntime}
                    formatMoney={formatMoney}
                />
            </div>

            <div>
                <MovieStats movie={movie} />
                <QuickProviders watchProviders={watchProviders} />
            </div>
        </div>
    );
};

export default MovieOverview;
