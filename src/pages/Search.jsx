import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { movieAPI } from "../api/movieAPI";

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (query) {
            searchMovies(query, 1);
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const searchMovies = async (searchTerm, pageNum = 1) => {
        if (!searchTerm) return;

        setLoading(true);
        try {
            const data = await movieAPI.searchMovies(searchTerm, pageNum);

            const formattedResults = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
                poster: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://placehold.co/300x450/13171f/cccccc?text=No+Poster',
                overview: movie.overview,
                rating: movie.vote_average
            }));

            setSearchResults(formattedResults);
            setTotalPages(data.total_pages > 100 ? 100 : data.total_pages);
            setPage(pageNum);
        } catch (error) {
            console.error("Error searching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const loadNextPage = () => {
        if (page < totalPages) {
            searchMovies(query, page + 1);
        }
    };

    const loadPrevPage = () => {
        if (page > 1) {
            searchMovies(query, page - 1);
        }
    };


    return (
        <div className="bg-[#0f1115] min-h-screen text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                        {query ? `Search Results for "${query}"` : "Search Movies"}
                    </h1>

                    {loading ? (
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-500"></div>
                            <span>Searching...</span>
                        </div>
                    ) : query && (
                        <div className="text-gray-400">
                            {searchResults.length > 0 ? (
                                <p>Found {searchResults.length} results - Page {page} of {totalPages}</p>
                            ) : (
                                <p>No results found for "{query}"</p>
                            )}
                        </div>
                    )}
                </div>

                {!loading && searchResults.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {searchResults.map((movie) => (
                            <div
                                key={movie.id}
                                className="bg-[#13171f] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
                                onClick={() => handleMovieClick(movie.id)}
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold truncate">{movie.title}</h3>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>{movie.year}</span>
                                        <span>⭐ {movie.rating?.toFixed(1) || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages > 1 && !loading && (
                    <div className="flex justify-center mt-10 gap-2">
                        <button
                            onClick={loadPrevPage}
                            disabled={page === 1}
                            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-700 text-gray-500' : 'bg-[#13171f] text-white hover:bg-[#1d232f]'}`}
                        >
                            Previous
                        </button>
                        <div className="bg-[#13171f] text-white px-4 py-2 rounded">
                            {page} / {totalPages}
                        </div>
                        <button
                            onClick={loadNextPage}
                            disabled={page === totalPages}
                            className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-700 text-gray-500' : 'bg-[#13171f] text-white hover:bg-[#1d232f]'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
