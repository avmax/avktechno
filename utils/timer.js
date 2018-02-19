/* eslint-disable */

module.exports = () => {
  return () => {
    const start = new Date();

    return () => {
      const end = new Date();
      const diff = Math.abs((end - start) / 1000);
      return diff;
    };
  };
};
