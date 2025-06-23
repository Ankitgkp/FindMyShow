import React from 'react';
import { FaInfoCircle, FaUsers, FaPlay, FaGlobe } from "react-icons/fa";

const MovieTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-[#13171f] sticky top-0 z-30 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto no-scrollbar">
                <button 
                    className={`px-5 py-4 border-b-2 font-medium ${activeTab === 'info' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('info')}
                >
                    <span className="flex items-center gap-2"><FaInfoCircle /> Overview</span>
                </button>
                <button 
                    className={`px-5 py-4 border-b-2 font-medium ${activeTab === 'cast' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('cast')}
                >
                    <span className="flex items-center gap-2"><FaUsers /> Cast</span>
                </button>
                <button 
                    className={`px-5 py-4 border-b-2 font-medium ${activeTab === 'watch' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('watch')}
                >
                    <span className="flex items-center gap-2"><FaPlay /> Watch</span>
                </button>
                <button 
                    className={`px-5 py-4 border-b-2 font-medium ${activeTab === 'languages' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('languages')}
                >
                    <span className="flex items-center gap-2"><FaGlobe /> Languages</span>
                </button>
            </div>
        </div>
    );
};

export default MovieTabs;
