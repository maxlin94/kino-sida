import { test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';
import { getMovies } from '../utils/movieUtils.js';
const movies = await getMovies();

test('Ensure that /movies returns a 200 status code', async () => {
    const response = await request(app).get('/movies');
    expect(response.statusCode).toBe(200);
});

movies.data.forEach((movie) => {
    test(`Ensure that /movies/${movie.id} title is ${movie.attributes.title}`, async () => {
        const response = await request(app).get(`/movies/${movie.id}`);
        expect(response.text).toContain(movie.attributes.title);
    });
});