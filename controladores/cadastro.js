const knex = require("../conexao");
const bcrypt = require("bcrypt");
const { validarUsuario } = require("../validacao/usuarios");

const CadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailCadastrado = await knex('usuarios').where('email', email);
        
    if(emailCadastrado.length > 0) {
      return res.status(400).json("O email já existe");
    }

    const ErroNaValidacaoDoUsuario = validarUsuario(
      nome,
      email,
      senha
    );

    if (ErroNaValidacaoDoUsuario) {
      return res.status(400).json(ErroNaValidacaoDoUsuario);
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex('usuarios').insert({nome, email, senha: senhaCriptografada}).returning('*');

        if(novoUsuario.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

    res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { CadastrarUsuario };
