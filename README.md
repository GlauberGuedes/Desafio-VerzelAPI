# Desafio-VerzelAPI

Link da aplicação: https://desafioverzel-api.herokuapp.com/
ou
baixar o repositório e dar um "npm run dev" (atualizar os dados do banco de dados para o seu próprio caso deseje).
Dump das tabelas do banco de dados no arquivo schema.sql.

banco de dados postgreSQL.

## Endpoints:

### `POST` `/cadastro`

Ele receberá as informações de cadastro (nome, email e senha), verificará se já existe um cadastro com esse email e se os campos enviados estão corretos, caso esteja tudo correto, irá criptografar a senha enviada e salvar o usuário no banco de dados.

### `POST` `/login`

Ele receberá as informações de login (email e senha), verificará se o email existe na tabela de usuários do banco de dados e se a senha confere com a senha cadastrada, caso esteja tudo correto, irá criar um token e enviar ele na resposta.

### `GET` `/modulos`

Lista todos os módulos em ordem alfabética.

### `GET` `/aulas`

Lista todas as aulas em ordem alfabética.

### `POST` `/modulos`

Ele receberá as informações de cadastro do módulo pelo body da requisição e irá verificar se já existe um módulo com o nome enviado, caso não exista criará um módulo com as informações recebidas.

### `PUT` `/modulos/:id`

Ele receberá as informações de atualização do módulo pelo body da requisição e o id pelo parâmetro, logo depois irá verificar se já existe um módulo com o nome enviado e se o id existe, caso o id exista e não tenha módulo com o nome recebido, o módulo será atualizado.

### `DELETE` `/modulos/:id`

Ele receberá o id do módulo pelo parâmetro, caso exista um modulo com esse id ele será excluído.

### `POST` `/aulas`

Ele receberá as informações de cadastro da aula(nome, nome do modulo, data) pelo body da requisição e irá verificar se existe um módulo com o nome do módulo enviado, caso exista criará uma aula com as informações recebidas.
Todos os campos são obrigatórios.

### `PUT` `/aulas/:id`

Ele receberá as informações de atualização da aula pelo body da requisição e o id pelo parâmetro, logo depois irá verificar se o id dessa aula existe, caso o id exista, uma verificação se será feita para validar o módulo(caso seja informado) e depois a aula será atualizada.

### `DELETE` `/aulas/:id`

Ele receberá o id da aula pelo parâmetro, caso exista uma aula com esse id ela será excluída.


