import tmdb from './tmdb';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export async function getPopularMovies(): Promise<Movie[]> {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
}
