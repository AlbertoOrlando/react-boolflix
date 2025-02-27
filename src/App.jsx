import { useState } from 'react'
import axios from 'axios'

function App() {
  const [state, setState] = useState(''); // Initialize as an empty string
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  function fetchResults(e) {
    e.preventDefault(); // Prevent default form submission
    const movieRequest = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=33dd7e4bd707ec9911740ceb7d4fa3c7&language=it_IT&query=${state}`);
    const tvRequest = axios.get(`https://api.themoviedb.org/3/search/tv?api_key=33dd7e4bd707ec9911740ceb7d4fa3c7&language=it_IT&query=${state}`);

    axios.all([movieRequest, tvRequest])
      .then(axios.spread((movieRes, tvRes) => {
        setMovies(movieRes.data.results);
        setSeries(tvRes.data.results);
        setState('');
      }))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>boolflix</h1>
      <form onSubmit={fetchResults}>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <button type="submit">cerca</button>
      </form>
      {movies.length > 0 && <h2>Film</h2>}
      <div className="results">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <h3>{movie.original_title}</h3>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
            {movie.original_language === 'en' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="Flag of English" />
            )}
            {movie.original_language === 'it' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/it.svg" alt="Bandiera italiana" />
            )}
            {movie.original_language === 'es' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/es.svg" alt="Bandera española" />
            )}
            {movie.original_language === 'fr' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/fr.svg" alt="Drapeau français" />
            )}
            {movie.original_language === 'de' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="Deutsche Flagge" />
            )}
            {movie.original_language === 'ja' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="Deutsche Flagge" />
            )}
            {!['en', 'it', 'es', 'fr', 'de', 'ja'].includes(movie.original_language) && (
              <p>{movie.original_language}</p>
            )}
            <p>{movie.overview}</p>
            <p>{movie.vote_average}</p>
          </div>
        ))}
      </div>
      {series.length > 0 && <h2>Serie TV</h2>}
      <div className="results">
        {series.map((serie) => (
          <div key={serie.id}>
            <h2>{serie.name}</h2>
            <h3>{serie.original_name}</h3>
            <img src={`https://image.tmdb.org/t/p/w300/${serie.poster_path}`} alt={serie.name} />
            {serie.original_language === 'en' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="Flag of English" />
            )}
            {serie.original_language === 'it' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/it.svg" alt="Bandiera italiana" />
            )}
            {serie.original_language === 'es' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/es.svg" alt="Bandera española" />
            )}
            {serie.original_language === 'fr' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/fr.svg" alt="Drapeau français" />
            )}
            {serie.original_language === 'de' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="Deutsche Flagge" />
            )}
            {serie.original_language === 'ja' && (
              <img className='flag' src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="Deutsche Flagge" />
            )}
            {!['en', 'it', 'es', 'fr', 'de', 'ja'].includes(serie.original_language) && (
              <p>{serie.original_language}</p>
            )}
            <p>{serie.overview}</p>
            <p>{serie.vote_average}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;