import React from 'react';
import { FaLanguage } from 'react-icons/fa';

const LanguageSection = ({ languages }) => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-cyan-500">
                Available Languages
            </h2>
            <div className="bg-[#13171f] rounded-lg p-5">
                <div className="flex flex-wrap gap-2">
                    {languages.length > 0 ?
                        languages.map((language, index) => (
                            <span
                                key={index}
                                className="py-1 px-3 bg-[rgba(255,255,255,0.08)] rounded-full text-sm flex items-center gap-1"
                            >
                                <FaLanguage className="text-cyan-400" />
                                {language}
                            </span>
                        ))
                        : <p>No language information available</p>
                    }
                </div>
            </div>
        </section>
    );
};

export default LanguageSection;
