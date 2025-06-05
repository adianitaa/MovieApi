import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tmdb from './api/tmdb';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        tmdb.get(`/movie/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.error('Error al cargar detalles:', err));
    }, [id]);

    if (!movie) return <p>Cargando...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>{movie.title}</h2>
            <div className="hola md:w-1/2 center">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ maxWidth: '300px', borderRadius: '8px' }}
                />
            </div>
            <div className="adios md:w-1/2 center">
                <h3>Descripción:</h3>
                <p style={{ maxWidth: '600px' }}>{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
