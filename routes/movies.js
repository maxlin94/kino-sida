import express from 'express';

export const movieRouter = express.Router();

async function getMovieById(id) {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    const json = await response.json();
    return json;
}

async function getMovies() {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/`);
    const json = await response.json();
    return json;
}

movieRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);
    if (!movie.data) {
        res.send(`No movie with id ${id}`);
        return
    }
    res.render('movie', { movie: movie.data });
});

movieRouter.get('/', async (req, res) => {
    const movies = await getMovies();
    console.log(movies)
    if (!movies.data) {
        res.send('Something went wrong with your request. Please try again later.');
        return
    }
    res.render('movies', { movies: movies.data });
});

