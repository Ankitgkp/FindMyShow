import React from 'react';
import { motion } from 'framer-motion';

const CastSection = ({ cast }) => {
    return (
        <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <motion.h2
                className="text-xl font-semibold mb-4 text-cyan-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Top Cast
            </motion.h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {cast.length > 0 ? cast.map((person, index) => (
                    <motion.div
                        key={person.id}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.3 + (index * 0.05),
                            ease: "easeOut"
                        }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div
                            className="w-full aspect-square rounded-full overflow-hidden mb-2"
                            whileHover={{ scale: 1.05 }}
                        >
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
                        </motion.div>
                        <h3 className="font-medium text-sm">{person.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                    </motion.div>
                )) : <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    No cast information available
                </motion.p>}
            </div>
        </motion.section>
    );
};

export default CastSection;
