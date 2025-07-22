import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import { useBookmarks } from '../contexts/BookmarksContext';
import { useToast } from '../contexts/ToastContext';
import { useUser } from '@clerk/clerk-react';

const BookmarkButton = ({ movie, className = '', size = 'md' }) => {
    const { toggleBookmark, isBookmarked, isSignedIn } = useBookmarks();
    const { showSuccess, showError, showInfo } = useToast();
    const { user } = useUser();

    if (!isSignedIn) {
        return null;
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!movie || !movie.id) {
            showError('Unable to bookmark this movie');
            return;
        }

        const wasBookmarked = isBookmarked(movie.id);
        const success = toggleBookmark(movie);

        if (success) {
            if (wasBookmarked) {
                showInfo(`Removed "${movie.title}" from bookmarks`);
            } else {
                showSuccess(`Added "${movie.title}" to bookmarks`);
            }
        } else {
            showError('Failed to update bookmark');
        }
    };

    const sizeClasses = {
        sm: 'p-1.5 text-sm',
        md: 'p-2 text-base',
        lg: 'p-3 text-lg'
    };

    const bookmarked = isBookmarked(movie.id);

    return (
        <button
            onClick={handleClick}
            className={`
                bg-black bg-opacity-70 rounded-full 
                ${bookmarked ? 'text-cyan-400' : 'text-white'} 
                hover:text-cyan-400 transition-colors
                hover:bg-opacity-90
                ${sizeClasses[size]}
                ${className}
            `}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
            <FiBookmark className={bookmarked ? 'fill-current' : ''} />
        </button>
    );
};

export default BookmarkButton;
