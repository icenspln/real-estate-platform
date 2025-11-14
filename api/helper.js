// helper functions

const log = (str, severity) => {
  // 1 - log
  // 2 - debug
  // 3 - error
  switch (severity) {
    case 1:
      console.log(`[LOG] ${str}.`);
      break;
    case 2:
      console.log(`[DEBUG] ${str}.`);
      break;
    case 3:
      console.log(`[ERROR] ${str}.`);
      break;
  }
};

export { log };
