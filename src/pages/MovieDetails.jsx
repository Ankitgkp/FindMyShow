import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatRuntime, formatMoney, getTopProviders } from "../utils/movieUtils";
import MovieHero from "../components/movie/MovieHero";
import LanguageSection from "../components/movie/LanguageSection";
import CastSection from "../components/movie/CastSection";
import MovieDetailsInfo from "../components/movie/MovieDetailsInfo";
import StreamingSection from "../components/movie/StreamingSection";
import { FaArrowLeft } from "react-icons/fa";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    const api_key = '6202f94b6418df7cceae36ed85dbb19c';

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Scroll to top when component mounts
                window.scrollTo(0, 0);

                // Fetch movie details
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=credits,videos`);
                const movieData = await movieRes.json();

                // Fetch watch providers
                const providersRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`);
                const providersData = await providersRes.json();

                // Get movie languages
                const languagesRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=translations`);
                const languagesData = await languagesRes.json();

                setMovie(movieData);
                setWatchProviders(providersData.results?.US || null); // Get US providers or null

                // Extract unique languages from the translations data
                if (languagesData.translations?.translations) {
                    const uniqueLanguages = [...new Set(
                        languagesData.translations.translations.map(t => t.english_name)
                    )].slice(0, 10); // Limit to 10 languages
                    setLanguages(uniqueLanguages);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleBackClick = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#0f1115]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-white text-center py-20 bg-[#0f1115] min-h-screen">
                <h2 className="text-2xl">Movie not found</h2>
            </div>
        );
    }

    // Get director
    const director = movie.credits?.crew?.find(person => person.job === "Director");

    const topCast = movie.credits?.cast?.slice(0, 6) || [];

    // Get trailer
    const trailer = movie.videos?.results?.find(video => video.type === "Trailer" && video.site === "YouTube") ||
        movie.videos?.results?.[0];

    return (
        <div className="bg-[#0f1115] text-white min-h-screen pb-12">
            {/* Back button */}
            <button
                className="fixed top-20 left-4 z-40 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] text-white p-3 rounded-full shadow-lg"
                onClick={handleBackClick}
            >
                <FaArrowLeft />
            </button>

            {/* Hero section with backdrop */}
            <MovieHero
                movie={movie}
                formatRuntime={formatRuntime}
                trailer={trailer}
            />

            {/* Movie info sections */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="col-span-1 md:col-span-2">
                    {/* Languages section */}
                    <LanguageSection languages={languages} />

                    {/* Cast section */}
                    <CastSection cast={topCast} />

                    {/* Movie details */}
                    <MovieDetailsInfo
                        movie={movie}
                        director={director}
                        formatRuntime={formatRuntime}
                        formatMoney={formatMoney}
                    />
                </div>

                {/* Watch providers section */}
                <div>
                    <StreamingSection
                        watchProviders={watchProviders}
                        getTopProviders={getTopProviders}
                        movie={movie}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
