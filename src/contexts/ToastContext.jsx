import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiX, FiInfo, FiAlertCircle } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ toast, onRemove }) => {
    const icons = {
        success: FiCheckCircle,
        error: FiAlertCircle,
        info: FiInfo
    };

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`
                flex items-center gap-3 p-4 rounded-lg shadow-lg text-white
                ${colors[toast.type]} max-w-sm w-full
            `}
        >
            <Icon className="text-lg flex-shrink-0" />
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-white hover:text-gray-200 transition-colors"
            >
                <FiX />
            </button>
        </motion.div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const toast = { id, message, type };

        setToasts(prev => [...prev, toast]);

        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (message) => addToast(message, 'success');
    const showError = (message) => addToast(message, 'error');
    const showInfo = (message) => addToast(message, 'info');

    return (
        <ToastContext.Provider
            value={{
                addToast,
                removeToast,
                showSuccess,
                showError,
                showInfo
            }}
        >
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            toast={toast}
                            onRemove={removeToast}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
