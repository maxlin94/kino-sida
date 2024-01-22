import express from 'express';

const app = express();

app.listen(5080, () => {
    console.log('Server started (http://localhost:5080/) !');
});

app.use(express.static('./src/public'));