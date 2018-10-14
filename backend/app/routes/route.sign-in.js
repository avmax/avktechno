exports.post = (req, res, next) => {
  const { body } = req;

  if (body.login === 'bento' && body.password === 'qazxswedc') {
    res.status(200).send(true);
  } else {
    res.status(400).send('wrong login or password');
  }
};

