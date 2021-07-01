const knex = require("../conexao");

const listasAulas = async (req, res) => {
  try{
    const aulas = await knex('aulas').orderBy('nome');

    res.json(aulas);
  }catch(error) {
    return res.status(400).json(error.message)
  }
}

const cadastrarAula = async (req, res) => {
  const { nome, data, modulo } = req.body;

  if(!nome) {
    res.status(400).json('O campo nome é obrigatório.')
  }
  if(!data) {
    res.status(400).json('O campo data é obrigatório.')
  }
  if(!modulo) {
    res.status(400).json('O campo modulo é obrigatório.')
  }

  try {
    const verificarModulo = await knex('modulos').where("nome", "ilike", modulo).first();

    if(!verificarModulo) {
      return res.status(400).json('O módulo não foi encontrado.');
    }
    
    const aula = await knex('aulas').insert({ nome, data, modulo: verificarModulo.nome, modulo_id: verificarModulo.id }).returning('*');

    if(!aula) {
      res.status(400).json('Não foi possível cadastrar o módulo.')
    }

    res.status(200).json(aula);
  }catch(error) {
    return res.status(400).json(error.message)
  }
}

const atualizarAula = async (req, res) => {
  const { nome, data, modulo } = req.body;
  const { id } = req.params;

  if(!nome && !data && !modulo) {
    return res.status(400).json('É necessário preencher algum campo.');
  }
  try{
    const aula = await knex('aulas').where({id: id});
    
    if(!aula) {
      return res.status(404).json('Aula não encontrado');
    }

    if(modulo) {
      const verificarModulo = await knex('modulos').where("nome", "ilike", modulo).first();

      if(!verificarModulo) {
        return res.status(404).json('Módulo informado não foi encontrado.');
      }
      const aulaAtualizada = await knex('aulas').update({nome, data, modulo: verificarModulo.nome, modulo_id: verificarModulo.id}).where({id})

      if(aulaAtualizada === 0) {
        return res.status(400).json('Não foi possível atualizar a aula.');
      }
  
      return res.json('Aula atualizada com sucesso.')
    }

    const AulaAtualizado = await knex('aulas').update({nome, data}).where({id});

    if(AulaAtualizado === 0) {
      return res.status(400).json('Não foi possível atualizar o aula.');
    }

    res.json('Aula atualizado com sucesso.')
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

const deletarAula = async (req, res) => {
  const { id } = req.params;

  try{
    const aula = await knex('aulas').where({id: id});

    if(!aula) {
      return res.status(404).json('Aula não encontrado');
    }

    const aulaDeletada = await knex('aulas').del().where({id: id});

    if(aulaDeletada === 0) {
      return res.status(400).json('Não foi possível deletar a aula.');
    }

    return res.json('Aula deletada com sucesso.')
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { cadastrarAula, listasAulas, atualizarAula, deletarAula }