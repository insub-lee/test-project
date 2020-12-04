/**
 *
 * @param json - object
 * @returns {string}
 */
export default (json = {}) => {
  const queryString = Object.keys(JSON.parse(JSON.stringify(json)))
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
  return `${queryString}`;
};
