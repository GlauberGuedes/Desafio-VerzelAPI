const express = require('express');
const rotas = express();
const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
const verificarToken = require('./filtros/verificarToken');
const modulo = require('./controladores/modulos');
const aula = require('./controladores/aulas');

//cadastro
rotas.post('/cadastro', cadastro.CadastrarUsuario);

//login
rotas.post('/login', login.loginUsuario);

rotas.get('/modulos', modulo.listasModulos);
rotas.get('/aulas/:modulo', aula.listasAulas);

rotas.use(verificarToken);


rotas.post('/modulos', modulo.cadastrarModulo);
rotas.put('/modulos/:id', modulo.atualizarModulo);
rotas.delete('/modulos/:id', modulo.deletarModulo);


rotas.post('/aulas', aula.cadastrarAula);
rotas.put('/aulas/:id', aula.atualizarAula);
rotas.delete('/aulas/:id', aula.deletarAula);


module.exports = rotas;