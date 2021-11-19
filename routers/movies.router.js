const router = require('express').Router();
const moviesController = require('../controllers/movies.controller');

router.route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.addNewMovie);

router.delete('/:movieId', moviesController.deleteMovieById);

module.exports = router;
