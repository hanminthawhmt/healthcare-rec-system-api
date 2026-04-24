const userRoutes = require('./domains/users/routes')
const loginRoutes = require('./domains/auth/routes')
const express = require("express");

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/login', loginRoutes);

app.use((err, req, res, next) => {
    console.error('Message:', err.message)
    console.error('Cause:', err.cause)
    console.error('Full error:', err)
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});

module.exports =  app ;
