const userService = require('./service');
const jwt = require('jsonwebtoken');
const env = require('../../config/env')

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createOne(req.body);

        const token = jwt.sign({id: user.id}, env.JWT_SECRET, {expiresIn : `${env.JWT_EXPIRES_IN}`});


        res.status(201).json({
            status: 'success',
            token,
            data: { user }
        });
    } catch (error) {
        next(error); 
    }
};

module.exports = { createUser };