const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Movie = require('../models/movie');
const HTTP_CODES = require('../utils/http-codes');

async function getAllMovies(req, res, next) {
  const { _id } = req.user;
  try {
    const movies = await Movie.find({ owner: _id });

    return res
      .status(HTTP_CODES.SUCCESS_CODE)
      .json(movies);
  } catch (err) {
    console.error(err.name, err.message);

    return next(err);
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
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  try {
    const alreadyLiked = await Movie.findOne({ owner, movieId });

    if (alreadyLiked) {
      return next(new ValidationError('Уже добавлено в коллекцию'));
    }

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
      nameRU,
      nameEN,
    });

    return res
      .status(HTTP_CODES.CREATED_CODE)
      .json(movie);
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

async function deleteMovieById(req, res, next) {
  const { _id } = req.user;
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).orFail();
    if (!movie.owner.equals(_id)) {
      return next(new ForbiddenError('Недостаточно прав для операции'));
    }

    await Movie.deleteOne({ _id: movieId, owner: _id }).orFail();

    return res
      .status(HTTP_CODES.SUCCESS_CODE)
      .json({ message: 'Фильм успешно удалён' });
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка с фильмом не найдена'));
    }
    if (err.name === 'CastError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

module.exports = { getAllMovies, addNewMovie, deleteMovieById };
