const refsEqualIs = (r1, r2) => {
  let flag = Object.keys(r1).length === Object.keys(r2).length;
  if (flag) {
    Object.keys(r1).forEach((key) => {
      flag = r1[key].length === r2[key].length && flag;
      if (flag) {
        r1[key].sort();
        r2[key].sort();
        r1[key].forEach((v, i) => flag = v === r2[key][i]);
      }
    });
  }

  return flag;
};

// eslint-disable-next-line
export { refsEqualIs };
