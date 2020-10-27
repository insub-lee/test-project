export default (jsonString = '{}', defaultValue = {}) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.debug(e);
    return defaultValue;
  }
};
