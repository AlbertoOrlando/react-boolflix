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
      <h2>Film</h2>
      <div className="results">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
      <h2>Serie TV</h2>
      <div className="results">
        {series.map((serie) => (
          <div key={serie.id}>
            <h2>{serie.name}</h2>
            <img src={`https://image.tmdb.org/t/p/w300/${serie.poster_path}`} alt={serie.name} />
            <p>{serie.overview}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;