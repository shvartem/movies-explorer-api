const router = require('express').Router();
const moviesController = require('../controllers/movies.controller');
const { addNewMovieValidation, movieIdValidation } = require('../utils/validate-requests');

router.route('/')
  .get(moviesController.getAllMovies)
  .post(addNewMovieValidation, moviesController.addNewMovie);

router.delete('/:movieId', movieIdValidation, moviesController.deleteMovieById);

module.exports = router;
