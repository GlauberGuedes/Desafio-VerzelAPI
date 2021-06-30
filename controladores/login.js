const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaToken = require("../senhaToken");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json("Email e senha devem ser informados.");
  }

  try {
    const usuario = await knex('usuarios').where({ email }).first();

      if(!usuario) {
        return res.status(400).json("O usuario não foi encontrado");
      }

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json("Email e senha não confere.");
    }

    const token = jwt.sign({ id: usuario.id }, senhaToken);
    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { loginUsuario };