const notEmpty = (data) => {
  try {
    if (Array.isArray(data)) {
      return data.length ? true : false;
    } else if (data !== null && typeof data === 'object') {
      return Object.keys(data).length > 0;
    } else {
      return false;
    }
  } catch (e) { }
  return false;
}

export const empty = (data) => {
  return !notEmpty(data);
}

export default notEmpty;