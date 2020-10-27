export default (ArrayString = '[]', defaultValue = []) => {
  try {
    return JSON.parse(ArrayString);
  } catch (e) {
    console.debug(e);
    return defaultValue;
  }
};
