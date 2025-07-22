const API_KEY = '6202f94b6418df7cceae36ed85dbb19c';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieAPI = {
    getNowPlayingMovies: async (page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&region=US`);
            const data = await response.json();

            const sixtyDaysAgo = new Date();
            sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

            const recentMovies = data.results.filter(movie => {
                if (!movie.release_date) return false;
                const releaseDate = new Date(movie.release_date);
                return releaseDate >= sixtyDaysAgo;
            });

            return { ...data, results: recentMovies };
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
            throw error;
        }
    },

    getPopularMovies: async (pages = [1, 2]) => {
        try {
            const requests = pages.map(page =>
                fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
            );

            const responses = await Promise.all(requests);
            const dataPromises = responses.map(res => res.json());
            const allData = await Promise.all(dataPromises);

            const allMovies = allData.flatMap(data => data.results);
            const sortedByPopularity = allMovies.sort((a, b) => b.popularity - a.popularity);

            return { results: sortedByPopularity.slice(0, 20) };
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    },

    getTopRatedMovies: async (page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            throw error;
        }
    },


    getUpcomingMovies: async (page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            throw error;
        }
    },


    getSportsMovies: async (page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=&with_keywords=9715|180301|215339|180547|158158&sort_by=popularity.desc&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching sports movies:', error);
            throw error;
        }
    },


    getMovieDetails: async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    },


    getWatchProviders: async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
            const data = await response.json();
            return data.results?.US || null;
        } catch (error) {
            console.error('Error fetching watch providers:', error);
            throw error;
        }
    },


    getMovieLanguages: async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=translations`);
            const data = await response.json();

            if (data.translations?.translations) {
                const uniqueLanguages = [...new Set(
                    data.translations.translations.map(t => t.english_name)
                )].slice(0, 10);
                return uniqueLanguages;
            }
            return [];
        } catch (error) {
            console.error('Error fetching movie languages:', error);
            throw error;
        }
    },


    searchMovies: async (query, page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },


    getTrendingMovies: async (timeWindow = 'week') => {
        try {
            const response = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    },


    getMoviesByGenre: async (genreId, page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            throw error;
        }
    }
};
