const Movie = require('../models/movie');
const HTTP_CODES = require('../utils/http-codes');

async function getAllMovies(req, res, next) {
  const { _id } = req.user;
  console.log({ _id });
  try {
    const movies = await Movie.find({ owner: _id });

    return res
      .status(HTTP_CODES.SUCCESS_CODE)
      .json(movies);
  } catch (err) {
    console.error(err.name, err.code, err.message);
    return next();
  }
}

async function addNewMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRu,
    nameEn,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner,
      movieId,
      nameRu,
      nameEn,
    });

    return res
      .status(HTTP_CODES.CREATED_CODE)
      .json(movie);
  } catch (err) {
    return next();
  }
}

async function deleteMovieById(req, res, next) {
  const { _id } = req.user;
  const { movieId } = req.params;
  try {
    await Movie.findOneAndDelete({ _id: movieId, owner: _id });

    return res
      .status(HTTP_CODES.SUCCESS_CODE)
      .json({ message: 'Фильм успешно удалён' });
  } catch (err) {
    return next();
  }
}

module.exports = { getAllMovies, addNewMovie, deleteMovieById };
