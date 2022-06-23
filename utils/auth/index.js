//Aca tendriamos las estrategias de inicio de sesion
const passport = require('passport');
const localStrategy = require('./strategies/localStrategy');
const JwtStrategy = require('./strategies/jwtStrategy');

passport.use(localStrategy);
passport.use(JwtStrategy);

