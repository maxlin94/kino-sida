import express from 'express';

export const aboutRouter = express.Router();

aboutRouter.get('/', async (req, res) => {
    res.render('about');
});