import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../api/tmdb';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


SwiperCore.use([Navigation, Pagination]);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    tmdb
      .get('/movie/popular')
      .then((res) => {
        console.log('Películas cargadas:', res.data.results);
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error('Error al cargar películas:', err);
        setError('No se pudieron cargar las películas');
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  if (movies.length === 0) {
    return <p style={{ color: 'gray' }}>Cargando películas...</p>;
  }

  return (
    <div className="w-full px-8">
      <h1>Películas Populares</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          300: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
                <h2 style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>{movie.title}</h2>
                <p style={{ fontSize: '0.875rem', color: '#000' }}>{movie.release_date}</p>
                <p style={{ fontSize: '0.875rem', color: '#000' }}>⭐ {movie.vote_average}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}