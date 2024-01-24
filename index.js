import express from 'express';
import { movieRouter } from './routes/movies.js';
import { aboutRouter } from './routes/about.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(5080, () => {
    console.log('Server listening on port 5080');
});

app.get('/', (req, res) => {
    res.render('index');
});
app.use('/movies', movieRouter);
app.use('/about', aboutRouter)
