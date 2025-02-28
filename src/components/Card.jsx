import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = ({ data }) => {
    const rating = Math.ceil(data.vote_average / 2);

    function calculateRating() {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    className="star"
                    key={i}
                    icon={faStar}
                    style={{ color: i <= rating ? 'gold' : 'white' }}
                />
            );
        }
        return stars;
    }

    // Funzione per ottenere il codice della bandiera
    const getFlagCode = (languageCode) => {
        const languageToCountry = {
            'en': 'gb',
            'it': 'it',
            'fr': 'fr',
            'es': 'es',
            'de': 'de',
            'ja': 'jp',
        };
        return languageToCountry[languageCode] || null;
    };

    const flagCode = getFlagCode(data.original_language);
    const isMovie = data.hasOwnProperty("title");
    return (


        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} alt={data.title} />
            <div className="card-info">
                <h2>{isMovie ? data.title : data.name}</h2>
                <h3>{isMovie ? data.original_title : data.original_name}</h3>
                {flagCode ? (
                    <img className='flag' src={`https://flagicons.lipis.dev/flags/4x3/${flagCode}.svg} alt={Bandiera ${flagCode}`} />
                ) : (
                    <p>{data.original_language}</p>
                )}
                <p>{data.original_language}</p>
                <p>{data.overview}</p>
                <div className="rating">{calculateRating()}</div>
            </div>
        </div>
    );
}

export default Card;