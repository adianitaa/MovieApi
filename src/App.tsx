import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tmdb from './api/tmdb';
import MovieDetails from '.././src/movieDetails';
import Layout from './components/layout';
import MovieList from './components/movieList';
import MetricsSlider from './api/datosGrafica';

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MetricsSlider />
              <MovieList />
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
