const express = require('express');
const rotas = express();
const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
const verificarToken = require('./filtros/verificarToken');
const modulo = require('./controladores/modulos');

//cadastro
rotas.post('/cadastro', cadastro.CadastrarUsuario);

//login
rotas.post('/login', login.loginUsuario);

rotas.use(verificarToken);

rotas.get('/modulos', modulo.listasModulos);
rotas.post('/modulos', modulo.cadastrarModulo);
rotas.put('/modulos/:id', modulo.atualizarModulo);
rotas.delete('/modulos', modulo.deletarModulo);


module.exports = rotas;