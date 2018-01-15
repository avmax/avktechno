exports.post = (req, res, next) => {
  const { body } = req;

  if (body.login === 'avktechno' && body.password === 'fuckyeah') {
    res.status(200).send(true);
  } else {
    res.status(400).send('wrong login or password');
  }
};

