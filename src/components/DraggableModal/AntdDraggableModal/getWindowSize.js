// export const getWindowSize = () => ({
//   console.debug('window', window,window.innerWidth);
//   width: window.innerWidth || 0,
//   height: window.innerHeight || 0,
// });

export const getWindowSize = () => {
  console.debug('window', window, window.innerWidth);
  return {
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
  };
};
