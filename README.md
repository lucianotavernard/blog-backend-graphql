# Blog Backend

Essa é uma aplicação de um blog para criar postagens e comentários.

## Stack de Desenvolvimento

- GraphQL, NodeJS, Yarn, JavaScript, ESLint, EditorConfig e Prettier. — core da platforma e ferramentas de desenvolvimento
- GraphQL Yoga, etc. — HTTP-server configurações padrão
- PostgreSQL, Sequelize, pg — SQL, ORM e Migrations

## Como iniciar o backend

1. Renomei o arquivo `.env.example` para `.env` e adicione **todas** as variáveis dentro do arquivo.
2. Instale as dependências do projeto: `yarn`.
3. Crie o banco de dados: `yarn sequelize db:create`.
4. Rode as migrations: `yarn sequelize db:migrate`.
5. Inicie o servidor: `yarn start`.
6. Envie as requisições para `http://localhost:4000`.
