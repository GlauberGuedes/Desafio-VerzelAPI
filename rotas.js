const express = require('express');
const rotas = express();
const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
//const verificarToken = require('./filtros/verificarToken');

//cadastro
rotas.post('/cadastro', cadastro.CadastrarUsuario);

//login
rotas.post('/login', login.loginUsuario);

//rotas.use(verificarToken);



module.exports = rotas;