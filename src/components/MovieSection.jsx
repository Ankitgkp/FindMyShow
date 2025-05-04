import React from 'react'

const MovieSection = ({ title, movies }) => {
    return (
        <div className="mb-10 ml-30">
            <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
            <div className="flex space-x-4 overflow-x-auto no-scrollbar">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="w-[160px] h-[240px] flex-shrink-0 overflow-hidden rounded"
                    >
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieSection
