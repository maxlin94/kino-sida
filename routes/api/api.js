import express from "express";
import cmsAdapter from "../../utils/cmsAdapter.js";
import { filterOldScreenings, filterReviews } from "../../utils/filters.js";

const apiRouter = express.Router();
const APIBaseURL = 'https://plankton-app-xhkom.ondigitalocean.app/api';


apiRouter.get("/movies/:id/reviews", async (req, res) => {
    const payload = await cmsAdapter.get(`${APIBaseURL}/reviews?filters[movie]=${req.params.id}`, filterReviews);
    res.json(payload);
});

apiRouter.post("/movies/:id/reviews", async (req, res) => {
    const payload = await cmsAdapter.post(`${APIBaseURL}/reviews`, req.body);
    res.json(payload);
});

apiRouter.get("/screenings/:id", async (req, res) => {
    const payload = await cmsAdapter.get(`${APIBaseURL}/screenings?filters[movie]=${req.params.id}`, filterOldScreenings);
    res.json(payload);
});

apiRouter.get("/screenings", async (req, res) => {
    const payload = await cmsAdapter.get(`${APIBaseURL}/screenings?populate=movie`, filterOldScreenings);
    res.json(payload);
});

export default apiRouter;