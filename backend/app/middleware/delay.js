module.exports = (delay) => {
  return (req, res, next) => {
    setTimeout(() => next(), delay);
  }
};
