const { Strategy } = require('passport-local');
/* const boom = require('@hapi/boom');
const bcrypt = require('bcrypt'); */
const authService = require('./../../../services/authService');

const service = new authService();

const localStrategy = new Strategy(async (email, password, done) => {
  try {
    /* //Con el servicio busca el email en la base de datos
    const user = await service.findByEmail(email);
    if (!user) {
      done(boom.unauthorized('Email no encontrado'), false);
    }

    //Compara la password con la de la base de datos y utilizamos bcrypt para comparar la contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      done(boom.unauthorized('Contraseña incorrecta'), false);
    }
    delete user.dataValues.password;

    //Sin ningun error le enviamos null sin ningun error y el user
    done(null, user); */
    //Utilizando un servicio que tiene el metodo de obtener el usuario
    const user = await service.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;
