import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const Searchbar = () => {
    const { state, setState, fetchResults } = useContext(GlobalContext);

    return (
        <form onSubmit={fetchResults}>
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Cerca film o serie TV..."
            />
            <button type="submit">Cerca</button>
        </form>
    );
};

export default Searchbar;