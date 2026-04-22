const userService = require('./service');

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createOne(req.body);
        res.status(201).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error); 
    }
};

module.exports = { createUser };