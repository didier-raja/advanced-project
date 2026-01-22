const logger = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} request to ${req.url}`);
    next();
};

module.exports = logger;