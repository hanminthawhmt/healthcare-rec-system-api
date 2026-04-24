const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT || 7000,
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN
}