import axios from "axios";
import { API_Option, TMDB_BASE_PATH } from "../constants.js";
import { Movie } from "../models/movie.model.js";
import { User } from "../models/user.model.js";
import { TVShow } from "../models/tvshow.model.js";

/* Controller function for Bookmarked movie */
export const bookmarkMovie = async function (req, res) {
  try {
    // get the userId from authenticate middleware
    const userId = req.id;
    // check user in database or not
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // get the movie id from query parameters
    const movieId = req.params.id;

    // get the movie that id same as movieId
    const movies = await Movie.find({ id: movieId });

    // check the length of movies if 0 new movie added in database
    if (movies.length === 0) {
      const result = await axios.get(
        `${TMDB_BASE_PATH}/movie/${movieId}?language=en-US`,
        API_Option
      );

      const movieNew = new Movie({
        id: result?.data.id,
        title: result?.data?.title,
        overview: result?.data.overview,
        poster_path: result?.data.poster_path,
        release_date: result?.data.release_date,
        adult: result?.data.adult,
      });
      await movieNew.save();
      // Add the movie's ObjectID to the user bookmarkMovies  array
      user.bookmarkedMovies.push(movieNew);
      await user.save();

      res.status(201).json({
        message: "Movie Bookmarked Successfully",
        success: true,
        movie: {
          id: movieNew?.id,
          title: movieNew?.title,
          overview: movieNew?.overview,
          poster_path: movieNew?.poster_path,
          release_date: movieNew?.release_date,
          adult: movieNew?.adult,
        },
      });
    } else if (movies.length > 0) {
      res
        .status(401)
        .json({ message: "Movie Already Bookmarked", bookmark: true });
    }
  } catch (error) {
    console.error("Error adding favorite movie:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const bookmarkTVShow = async function (req, res) {
  try {
    // get the userId from authenticate middleware
    const userId = req.id;
    // check user in database or not
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // get the tv show id from query parameters
    const tvshowId = req.params.id;

    // get the tv show that id same as tvshowId
    const tvshows = await TVShow.find({ id: tvshowId });
    // check the length of movies if 0 new tv show added in database
    if (tvshows.length === 0) {
      const result = await axios.get(
        `${TMDB_BASE_PATH}/tv/${tvshowId}?language=en-US`,
        API_Option
      );

      const tvshowNew = new TVShow({
        id: result?.data.id,
        name: result?.data?.name,
        overview: result?.data.overview,
        poster_path: result?.data.poster_path,
        first_air_date: result?.data.first_air_date,
        adult: result?.data.adult,
      });
      await tvshowNew.save();
      // Add the movie's ObjectID to the user bookmarkTVShow  array
      user.bookmarkedTVShows.push(tvshowNew);
      await user.save();

      res.status(201).json({
        message: "TV Show Bookmarked Successfully",
        success: true,
        tvshow: {
          id: tvshowNew.id,
          name: tvshowNew.name,
          overview: tvshowNew.overview,
          poster_path: tvshowNew.poster_path,
          first_air_date: tvshowNew.first_air_date,
          adult: tvshowNew.adult,
        },
      });
    } else if (tvshows.length > 0) {
      res
        .status(401)
        .json({ message: "TV Show Already Bookmarked", bookmark: true });
    }
  } catch (error) {
    console.error("Error adding favorite TV Show:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookmarkMovies = async function (req, res) {
  try {
    // get the userId from authenticate middleware
    const userId = req.id;
    // check user in database or not
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // get the bookmarked movies related to the user
    const bookmarkedMovies = await User.findOne({ _id: userId }).populate(
      "bookmarkedMovies"
    );
    res.status(201).json({
      success: true,
      bookmarkedMovies: bookmarkedMovies.bookmarkedMovies,
    });
  } catch (error) {
    console.error("Error in Getting Bookmarked movies:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookmarkTVShows = async function (req, res) {
  try {
    // get the userId from authenticate middleware
    const userId = req.id;
    // check user in database or not
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // get the bookmarked TV Shoe related to the user
    const bookmarkedTVShows = await User.findOne({ _id: userId }).populate(
      "bookmarkedTVShows"
    );
    res.status(201).json({
      success: true,
      bookmarkedTVShows: bookmarkedTVShows.bookmarkedTVShows,
    });
  } catch (error) {
    console.error("Error in Getting Bookmarked TV Shows :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
