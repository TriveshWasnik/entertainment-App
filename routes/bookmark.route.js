import express from "express";
import {
  bookmarkMovie,
  bookmarkTVShow,
  getBookmarkMovies,
  getBookmarkTVShows,
} from "../controllers/bookmark.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
/* Bookmarked TV Shows and Movies related Routes */
router.route("/movies/:id").post(isAuthenticated, bookmarkMovie);
router.route("/tvshows/:id").post(isAuthenticated, bookmarkTVShow);
router.route("/movies").get(isAuthenticated, getBookmarkMovies);
router.route("/tvshows").get(isAuthenticated, getBookmarkTVShows);
export default router;
