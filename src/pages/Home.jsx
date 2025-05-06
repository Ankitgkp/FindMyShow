import React, { useState, useEffect } from "react";
import MovieSection from "../components/MovieSection";

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);

    const API_KEY = '6202f94b6418df7cceae36ed85dbb19c';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res1 = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
                const res2 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
                const res3 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`);

                const data1 = await res1.json();
                const data2 = await res2.json();
                const data3 = await res3.json();

                const final = (movies) =>
                    movies.map(movie => ({
                        title: movie.title,
                        year: movie.release_date?.slice(0, 4),
                        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    }));

                setTrending(data1.results.map(movie => ({
                    title: movie.title,
                    year: movie.release_date?.slice(0, 4),
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                })));

                setTopRated(data2.results.map(movie => ({
                    title: movie.title,
                    year: movie.release_date?.slice(0, 4),
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                })));

                setActionMovies(data3.results.map(movie => ({
                    title: movie.title,
                    year: movie.release_date?.slice(0, 4),
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                })));

            } catch (err) {
                console.log("Failed to fetch movies:", err);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="bg-[#0f1115] p-6">
            <MovieSection title="Trending This Week" movies={trending} />
            <MovieSection title="Top Rated Movies" movies={topRated} />
            <MovieSection title="Action Movies" movies={actionMovies} />
        </div>
    );
};

export default Home;
