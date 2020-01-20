export const clone = (obj) => {
  if (obj === null || typeof(obj) !== 'object')
  return obj;

  const copy = obj.constructor();

  for (let attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = clone(obj[attr]);
    }
  }

  return copy;
}