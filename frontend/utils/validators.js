const validatorRequired = message => (v) => {
  message = message || 'Это поле обязательно!';
  if (v == null) {
    return message;
  } else if (v === '') {
    return message;
  }
  return true;
};

const validatorEmail = message => (v) => {
  // eslint-disable-next-line
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    (!!v && (pattern.test(v) || message || 'Такой почты нет в природе.')) || ''
  );
};

const validatorPassword = message => v =>
  (!!v &&
    (v.length >= 8 ||
      message ||
      'Длина пароля должна состовлять 8 и более символов')) ||
  '';

const validatorNumber = (message, length) => (val) => {
  let v = val;
  let m = message;

  if (v === '' || v == null) {
    return true;
  }

  let isValid = typeof +v === 'number';

  if (isValid && length) {
    v = typeof v === 'string' ? v : v.toString();
    const regExp = new RegExp(`^\\d{${length}}\\b$`);
    isValid = v.search(regExp) !== -1;
  }

  if (!m && length) {
    m = `Это поле может принимать только числа длины ${length}`;
  } else {
    m = 'Это поле может принимать только числа';
  }

  return isValid || message || m;
};

export {
  validatorRequired,
  validatorEmail,
  validatorPassword,
  validatorNumber,
};
