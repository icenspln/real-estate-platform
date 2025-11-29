// helper functions

const error = (str) => {
  console.log(`[ERROR]`, str);
};

const debug = (str) => {
  console.log(`[DEBUG]`, str);
};

const logg = (str) => {
  console.log(`[LOG]`, str);
};

module.exports = { logg, error, debug };
