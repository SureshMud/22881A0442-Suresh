// src/loggerMiddleware.js
const logger = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};

export default logger;
