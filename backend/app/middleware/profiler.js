// https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/

const { EventEmitter } = require('events');

// Aggregate all profiler results into an event emitter to make
// handling the results generic
const profiles = new EventEmitter();

profiles.on('route', ({ req, startTime, elapsedMS }) => {
  console.log(`${startTime}: `, req.method, req.url, `${elapsedMS}ms`);
});

const profiler = (req, res, next) => {
  const startTime = (new Date()).toTimeString().split(' ')[0];
  const start = Date.now();
  // The 'finish' event will emit once the response is done sending
  res.once('finish', () => {
    // Emit an object that contains the original request and the elapsed time in MS
    profiles.emit('route', { req, startTime,elapsedMS: Date.now() - start });
  });

  next();
};

module.exports = profiler;
