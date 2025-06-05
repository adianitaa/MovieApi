import { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

interface Movie {
    id: number;
    title: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Metrics = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tmdb.get('/movie/popular')
            .then(res => {
                setMovies(res.data.results);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <p>Cargando métricas...</p>;

    // Promedio de calificaciones
    const avgRating = (
        movies.reduce((acc, m) => acc + m.vote_average, 0) / movies.length
    ).toFixed(2);

    // Película más popular
    const mostVoted = movies.reduce((max, m) => m.vote_count > max.vote_count ? m : max, movies[0]);

    // Conteo de género por ID
    const genreCounts: Record<number, number> = {};
    movies.forEach((movie) => {
        movie.genre_ids.forEach((id) => {
            genreCounts[id] = (genreCounts[id] || 0) + 1;
        });
    });

    // Formato para gráfico Pie
    const genreData = Object.entries(genreCounts).map(([id, count]) => ({
        name: `ID ${id}`, //mapear estos IDs a nombres si haces otra petición
        value: count
    }));

    return (
        <div className="p-4 bg-white rounded shadow-md space-y-8">
            <h2 className="text-2xl font-bold">Métricas</h2>

            <strong>Promedio de calificaciones:</strong> {avgRating} / 10
            <strong>Película más popular:</strong> {mostVoted.title} con {mostVoted.vote_count} votos

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">⭐ Calificación por película</h3>
                    <ResponsiveContainer width="50%" height={300}>
                        <BarChart data={movies}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" hide />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="vote_average" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Géneros más comunes</h3>
                    <ResponsiveContainer width="50%" height={300}>
                        <PieChart>
                            <Pie data={genreData} dataKey="value" nameKey="name" outerRadius={100} label>
                                {genreData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Metrics;
