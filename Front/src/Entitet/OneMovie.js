import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"

const OneMovie = () => {

    const urlParams = useParams()
    const movieId = urlParams.id

    const [movie, setMovie] = useState({})


    const getMovie = useCallback(() => {
        TestAxios.get("/movies/" + movieId)
            .then(res => {
                console.log(res);
                setMovie(res.data)
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);

    useEffect(() => {
        getMovie()
    }, [])
    const getGenresStringFromMap = (genresMap) => {
        if (!genresMap || typeof genresMap !== 'object') {
            return '';
        }
        return Object.values(genresMap).join(', ');
    };

    return (
        <div>    

            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">{movie.name}</h1>
                    <p class="lead">Duration: {movie.duration} min. | Genre: {getGenresStringFromMap(movie.genres)}</p>
                </div>
            </div>


        </div>
    )
}

export default OneMovie