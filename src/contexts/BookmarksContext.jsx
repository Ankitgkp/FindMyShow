import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const BookmarksContext = createContext();

export const useBookmarks = () => {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error('useBookmarks must be used within a BookmarksProvider');
    }
    return context;
};

export const BookmarksProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn && user) {
            setLoading(true);
            try {
                const savedBookmarks = localStorage.getItem(`bookmarks_${user.id}`);
                if (savedBookmarks) {
                    setBookmarks(JSON.parse(savedBookmarks));
                }
            } catch (error) {
                console.error('Error loading bookmarks:', error);
                setBookmarks([]);
            } finally {
                setLoading(false);
            }
        } else {
            setBookmarks([]);
        }
    }, [isSignedIn, user]);

    // Save bookmarks to localStorage whenever bookmarks change
    useEffect(() => {
        if (isSignedIn && user && bookmarks.length >= 0) {
            try {
                localStorage.setItem(`bookmarks_${user.id}`, JSON.stringify(bookmarks));
            } catch (error) {
                console.error('Error saving bookmarks:', error);
            }
        }
    }, [bookmarks, isSignedIn, user]);

    const addBookmark = (movie) => {
        if (!isSignedIn) return false;

        const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.id === movie.id);
        if (!isAlreadyBookmarked) {
            setBookmarks(prev => [...prev, movie]);
            return true;
        }
        return false;
    };

    const removeBookmark = (movieId) => {
        if (!isSignedIn) return false;

        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== movieId));
        return true;
    };

    const isBookmarked = (movieId) => {
        return bookmarks.some(bookmark => bookmark.id === movieId);
    };

    const toggleBookmark = (movie) => {
        if (!isSignedIn) return false;

        if (isBookmarked(movie.id)) {
            return removeBookmark(movie.id);
        } else {
            return addBookmark(movie);
        }
    };

    const clearBookmarks = () => {
        if (!isSignedIn) return;
        setBookmarks([]);
    };

    return (
        <BookmarksContext.Provider
            value={{
                bookmarks,
                loading,
                addBookmark,
                removeBookmark,
                isBookmarked,
                toggleBookmark,
                clearBookmarks,
                isSignedIn,
                bookmarkCount: bookmarks.length
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
};
