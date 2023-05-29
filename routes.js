const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contatoController = require('./src/controllers/contatoController');

const { checkLogin } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/',homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/entry', registerController.login);

// Rotas de Logout

route.get('/login/logout', loginController.logout);

// Rotas de cadastro
route.get('/register/index', registerController.index);
route.post('/register/createAccount', registerController.register);

// Rotas de contato

route.get('/contato/index', checkLogin, contatoController.index);
route.post('/contato/register', checkLogin, contatoController.register);
route.get('/contato/index/:id',checkLogin, contatoController.editIndex);
route.post('/contato/edit/:id', checkLogin, contatoController.edit);
route.get('/contato/delete/:id', checkLogin, contatoController.delete);


module.exports = route;
