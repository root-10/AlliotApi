module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  logger: ':method :url :status :res[content-length] - :response-time ms'
};