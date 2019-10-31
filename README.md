create an app

$ lb
? Укажите имя приложения: loopback-auth-chat-postgres
? Введите имя каталога, в котором будет располагаться проект: loopback-auth-chat-postgres
? Какую версию LoopBack требуется использовать? 3.x (Active Long Term Support)
? Какой вид приложения требуется создать? empty-server (Пустой API LoopBack без настроенных моделей и источников данных)


setup datasource

1.install postgres if do not have then follow the steps bellow
$ sudo -u postgres psql
postgres=# create database loopback_auth_chat_postgres;
postgres=# create user loopback_auth_chat_postgres_user with encrypted password '111111';
postgres=# grant all priviliges on database loopback_auth_chat_postgres to loopback_auth_chat_postgres_user;

$ cd loopback_auth_chat_postgres
$ npm install loopback-connector-postgresql --save
$ lb datasource
? Введите имя источника данных: dsPsql
? Выберите коннектор для dsPsql: PostgreSQL (поддерживается StrongLoop)
? Connection String url to override other settings (eg: postgres://username:password@localhos
t/database):
? host: localhost
? port: 5432
? user: loopback_auth_chat_postgres_user
? password: [hidden]
? database: loopback_auth_chat_postgres

the result datasources.json looks
{
  "dsPsql": {
    "host": "localhost",
    "port": 5432,
    "url": "",
    "database": "loopback_auth_chat_postgres",
    "password": "111111",
    "name": "dsPsql",
    "user": "loopback_auth_chat_postgres_user",
    "connector": "postgresql"
  }
}

create models

1. model worker
extends buit-in bodel user for authentication
