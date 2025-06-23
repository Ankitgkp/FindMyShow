import React from 'react';

const QuickProviders = ({ watchProviders }) => {
    if (!watchProviders || !watchProviders.flatrate || watchProviders.flatrate.length === 0) {
        return null;
    }
    
    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-2 text-cyan-500">Available On</h3>
            <div className="flex flex-wrap gap-2">
                {watchProviders.flatrate?.slice(0, 3).map(provider => (
                    <div key={provider.provider_id} className="bg-white p-1 rounded">
                        <img
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickProviders;
