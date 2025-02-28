import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import Card from './Card';

export default function CardList() {
    const { movies, series } = useContext(GlobalContext);

    return (
        <>
            {movies.length > 0 && <h2 className='section'>Film</h2>}
            <div className="results">
                {movies.map((movie) => (
                    <Card key={movie.id} data={movie} />
                ))}
            </div>
            {series.length > 0 && <h2 className='section'>Serie TV</h2>}
            <div className="results">
                {series.map((serie) => (
                    <Card key={serie.id} data={serie} />
                ))}
            </div>
        </>
    );
}

