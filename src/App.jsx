import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalContext from './context/GlobalContext';
import Resultspage from './pages/Resultspage';
import DefaultLayout from './layout/DefaultLayout';

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
    <GlobalContext.Provider value={{ movies, series, fetchResults, state, setState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Resultspage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;