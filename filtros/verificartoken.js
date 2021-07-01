const jwt = require("jsonwebtoken");
const senhaToken = require("../senhaToken");
const knex = require("../conexao");

const verificarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json("O token não foi informado");
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, senhaToken);

    const usuario = await knex('usuarios').where({id});

    if(!usuario) {
      return res.status(400).json("Usuário não encontrado.");
    }

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verificarToken;