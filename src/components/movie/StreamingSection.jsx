import React from 'react';
import { FaGlobe } from 'react-icons/fa';

const StreamingSection = ({ watchProviders, getTopProviders, movie }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-cyan-500">Where to Watch</h2>
            {watchProviders && watchProviders.flatrate && watchProviders.flatrate.length > 0 ? (
                <div className="bg-[#13171f] rounded-lg p-5 space-y-6">
                    <div>
                        <h3 className="text-lg mb-3 font-medium">Stream</h3>
                        <div className="flex flex-wrap gap-4">
                            {getTopProviders(watchProviders.flatrate).map(provider => (
                                <div key={provider.provider_id} className="text-center">
                                    <div className="w-14 h-14 mx-auto bg-white rounded-md p-1 flex items-center justify-center">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            className="max-w-full max-h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-xs mt-1 whitespace-nowrap max-w-[80px] overflow-hidden text-ellipsis text-center">
                                        {provider.provider_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {watchProviders.link && (
                        <a
                            href={watchProviders.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                            More provider options
                        </a>
                    )}
                </div>
            ) : (
                <div className="bg-[#13171f] rounded-lg p-5">
                    <p>No streaming options available for this movie.</p>
                </div>
            )}

            {/* Official website if available */}
            {movie.homepage && (
                <div className="mt-6">
                    <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#13171f] hover:bg-[#1a1f29] w-full justify-center py-3 rounded text-cyan-400 font-medium transition"
                    >
                        <FaGlobe /> Visit Official Website
                    </a>
                </div>
            )}
        </div>
    );
};

export default StreamingSection;
