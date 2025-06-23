import React from 'react';
import { motion } from 'framer-motion';
import { FaLanguage } from 'react-icons/fa';

const LanguageSection = ({ languages }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-xl font-semibold mb-4 text-cyan-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Available Languages
            </motion.h2>
            <motion.div
                className="bg-[#13171f] rounded-lg p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {languages.length > 0 ?
                        languages.map((language, index) => (
                            <motion.span
                                key={index}
                                className="py-1 px-3 bg-[rgba(255,255,255,0.08)] rounded-full text-sm flex items-center gap-1"
                                variants={itemVariants}
                            >
                                <FaLanguage className="text-cyan-400" />
                                {language}
                            </motion.span>
                        ))
                        : <motion.p variants={itemVariants}>No language information available</motion.p>
                    }
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default LanguageSection;
