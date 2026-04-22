const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT || 7000,
    DATABASE_URL : process.env.DATABASE_URL
}