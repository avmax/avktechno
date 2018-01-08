exports.post = (req, res, next) => {
  const { body } = req;
  console.log(body);
  res.status(200).send();
};
