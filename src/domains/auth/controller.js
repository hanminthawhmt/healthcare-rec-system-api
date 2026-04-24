const jwt = require("jsonwebtoken");
const authService = require("./service");
const env = require("../../config/env");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.verifyUsers(email, password);

    const token = await jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
    try {
        const user = await authService.storeUser(req.body);

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

module.exports = {login, signup}
