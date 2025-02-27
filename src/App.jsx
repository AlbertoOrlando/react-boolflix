import { useState } from 'react'
import axios from 'axios'

function App() {
  const [state, setState] = useState(''); // Initialize as an empty string
  const [results, setResults] = useState([]);

  function fetchResults(e) {
    e.preventDefault(); // Prevent default form submission
    const movieRequest = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=33dd7e4bd707ec9911740ceb7d4fa3c7&language=it_IT&query=${state}`);
    const tvRequest = axios.get(`https://api.themoviedb.org/3/search/tv?api_key=33dd7e4bd707ec9911740ceb7d4fa3c7&language=it_IT&query=${state}`);

    axios.all([movieRequest, tvRequest])
      .then(axios.spread((movieRes, tvRes) => {
        setResults([...movieRes.data.results, ...tvRes.data.results]);
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
      <div className="results">
        {results.map((result) => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`} alt={result.title} />
            <p>{result.overview}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;