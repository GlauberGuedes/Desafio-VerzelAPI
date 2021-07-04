const knex = require("../conexao");

const listasModulos = async (req, res) => {
  try{
    const modulos = await knex('modulos').orderBy('nome');

    for(const modulo of modulos) {
      const aulas = await knex('aulas').where('modulo_id', modulo.id);
      modulo.aulas = aulas;
    }
    res.json(modulos);
  }catch(error) {
    return res.status(400).json(error.message)
  }
}

const cadastrarModulo = async (req, res) => {
  const { nome } = req.body;

  if(!nome) {
    res.status(400).json('O campo nome é obrigatório.')
  }
 
  try {
    const verificarModulo = await knex('modulos').where('nome', 'ilike', nome).first();
  
    if(verificarModulo) {
      return res.status(400).json('Já existe um módulo com este nome.')
    }

    const modulo = await knex('modulos').insert({ nome }).returning('*');

    if(!modulo) {
      res.status(400).json('Não foi possível cadastrar o módulo.')
    }

    res.status(200).json(modulo);
  }catch(error) {
    return res.status(400).json(error.message)
  }
}

const atualizarModulo = async (req, res) => {
  const { nome} = req.body;
  const { id } = req.params;

  if(!nome) {
    return res.status(400).json('O campo nome é obrigatório.');
  }

  try{
    const modulo = await knex('modulos').where({id: id});

    if(!modulo) {
      return res.status(404).json('Módulo não encontrado');
    }

    const verificarModulo = await knex('modulos').where('nome', 'ilike', nome).first();

    if(verificarModulo) {
      return res.status(400).json('Já existe um módulo com este nome.');
    }

    const moduloAtualizado = await knex('modulos').update({nome}).where({id});

    if(moduloAtualizado === 0) {
      return res.status(400).json('Não foi possível atualizar o módulo.');
    }

    res.json('Módulo atualizado com sucesso.')
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

const deletarModulo = async (req, res) => {
  const { id } = req.params;

  try{
    const modulo = await knex('modulos').where({id: id});

    if(!modulo) {
      return res.status(404).json('Módulo não encontrado');
    }

    const moduloDeletado = await knex('modulos').del().where({id: id});

    if(moduloDeletado === 0) {
      return res.status(400).json('Não foi possível deletar o módulo.');
    }

    return res.json('Módulo deletado com sucesso.')
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { cadastrarModulo, listasModulos, atualizarModulo, deletarModulo }