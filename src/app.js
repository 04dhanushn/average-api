
const express = require('express');

/**
 * Creates an Express application with its own number history.
 *
 * @returns {import('express').Express} Configured Express application.
 */
function createApp() {
  const app = express();
  const numbers = [];

  app.use(express.json());

  /**
   * Accepts a number and returns the average of all accepted numbers.
   *
   * @route POST /average
   * @param {number} req.body.number - Number to add to the history.
   * @returns {{average: number, count: number}} Running average and count.
   */
  app.post('/average', (req, res) => {
    const { number } = req.body ?? {};

    if (typeof number !== 'number' || !Number.isFinite(number)) {
      return res.status(400).json({
        error: 'The request body must contain a finite number.'
      });
    }

    numbers.push(number);

    const total = numbers.reduce((sum, value) => sum + value, 0);
    const average = total / numbers.length;

    return res.status(200).json({
      average,
      count: numbers.length
    });
  });

  return app;
}

module.exports = { createApp };
