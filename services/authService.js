const userService = require('./userServices');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new userService();
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Email no encontrado');
    }

    //Compara la password con la de la base de datos y utilizamos bcrypt para comparar la contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Contraseña incorrecta');
    }
    delete user.dataValues.password;
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecoveryPassword(email) {
    //para comprobar que el email existe en la bd
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Email no encontrado');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.mail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar Contraseña', // Subject line
      html: `<b>Ingresa a este link =>  ${link} </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infomail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.mail,
        pass: config.mailPassword,
      },
    });
    await transporter.sendMail(infomail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
