const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const AuthService = require('./../services/authService');
const service = new AuthService();
authRouter.post(
  '/login',
  //Capa de autenticacion
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      /* const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token,
      }); */
      const user = req.user;
      res.json(service.singToken(user));
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
