import React from 'react';

const CastSection = ({ cast }) => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-cyan-500">
                Top Cast
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {cast.length > 0 ? cast.map((person) => (
                    <div
                        key={person.id}
                        className="text-center"
                    >
                        <div className="w-full aspect-square rounded-full overflow-hidden mb-2">
                            {person.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                    alt={person.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                    No Photo
                                </div>
                            )}
                        </div>
                        <h3 className="font-medium text-sm">{person.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                    </div>
                )) : <p>No cast information available</p>}
            </div>
        </section>
    );
};

export default CastSection;
