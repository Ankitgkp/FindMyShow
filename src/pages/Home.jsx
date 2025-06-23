import React, { useState, useEffect } from "react";
import MovieSection from "../components/MovieSection";

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const api_key = '6202f94b6418df7cceae36ed85dbb19c';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const res1 = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`);
                const res2 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`);
                const res3 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28`);

                const data1 = await res1.json();
                const data2 = await res2.json();
                const data3 = await res3.json();

                const formatMovies = (movies) => movies.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    year: movie.release_date?.slice(0, 4),
                    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                        'https://placehold.co/300x450/13171f/cccccc?text=No+Poster',
                }));

                setTrending(formatMovies(data1.results));
                setTopRated(formatMovies(data2.results));
                setActionMovies(formatMovies(data3.results));
                setLoading(false);
            } catch (err) {
                console.error("Error in fetching movies:", err);
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#0f1115]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#0f1115] p-6">
            <MovieSection title="Trending Movies" movies={trending} />
            <MovieSection title="Top Rated Movies" movies={topRated} />
            <MovieSection title="Action Movies" movies={actionMovies} />
        </div>
    );
}

export default Home;