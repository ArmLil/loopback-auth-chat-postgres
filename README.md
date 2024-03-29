# The app is created by node.js/LoopBack, PostgreSQL

## Useful links

https://loopback.io/doc/en/lb3/index.html

PostgreSQL connector tutorial https://loopback.io/doc/en/lb3/Connecting-to-PostgreSQL.html

Database specific tutorials for PostgreSQL with loopback https://github.com/strongloop/loopback-example-database/tree/postgresql

### The steps to create and develop the app
 &NewLine;
 #### Create the initial app

     $ lb
     ? Укажите имя приложения: loopback-auth-chat-postgres
     ? Введите имя каталога, в котором будет располагаться проект: loopback-auth-chat-postgres
     ? Какую версию LoopBack требуется использовать? 3.x (Active Long Term Support)
     ? Какой вид приложения требуется создать? empty-server (Пустой API LoopBack без настроенных моделей и источников данных)

 #### setup datasource

      1.install postgres if do not have then follow the steps bellow
        $ sudo -u postgres psql
        postgres=# create database loopback_auth_chat_postgres;
        postgres=# create user loopback_auth_chat_postgres_user with encrypted password '111111';
        postgres=# grant all privileges on database loopback_auth_chat_postgres to loopback_auth_chat_postgres_user;


      2.connect the datasource
        $ cd loopback_auth_chat_postgres
        $ npm install loopback-connector-postgresql --save
        $ lb datasource
        ? Введите имя источника данных: dsPsql
        ? Выберите коннектор для dsPsql: PostgreSQL (поддерживается StrongLoop)
        ? Connection String url to override other settings (eg: postgres://username:password@localhost/database):
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


 #### create models

    1. worker (extends buit-in bodel user for authentication)
      $ lb model
      ? Введите имя модели: worker
      ? Выберите источник данных для подключения к нему worker: dsPsql (postgresql)
      ? Выберите базовый класс модели User
      ? Показать worker с помощью API REST? Yes
      ? Пользовательская множественная форма (используется для создания URL REST):
      ? Общая модель или только сервер? common

    2. article
       $ lb model
       ? Введите имя модели: article
       ? Выберите источник данных для подключения к нему article: dsPsql (postgresql)
       ? Выберите базовый класс модели PersistedModel
       ? Показать article с помощью API REST? Yes
       ? Пользовательская множественная форма (используется для создания URL REST):
       ? Общая модель или только сервер? common

        Теперь добавьте несколько свойств article.
        Для завершения введите пустое имя свойства.

       ? Введите имя свойства: title
       ? Тип свойства: string
       ? Является ли обязательным? No
       ? Значение по умолчанию [оставьте пустое поле, если значения нет]: title

       Добавьте другое свойство article.
       Для завершения введите пустое имя свойства.

       ? Введите имя свойства: content
       ? Тип свойства: string
       ? Является ли обязательным? No
       ? Значение по умолчанию [оставьте пустое поле, если значения нет]: the content is empty

       Добавьте другое свойство article.
       Для завершения введите пустое имя свойства.

       ? Введите имя свойства: author
       ? Тип свойства: string
       ? Является ли обязательным? No
       ? Значение по умолчанию [оставьте пустое поле, если значения нет]: auther is not defined

       Добавьте другое свойство article.
       Для завершения введите пустое имя свойства.


  #### add relations

      $ lb relation
      ? Выберите модель для создания из нее взаимосвязи: worker
      ? Тип связи: has many
      ? Выберите модель для создания взаимосвязи с ней: article
      ? Введите имя свойства для связи: (articles) loopback-datasource-juggler deprecated Метод Scope "getAsync()" устарел, используйте вместо него "find()". ../../../.nvm/versions/node/v12.13.0/lib/node_modules/loopback-cli/node_modules/generator-loopback/lib/helpers.js:132:37
      ? Введите имя свойства для связи: articles
      ? (Необязательно) введите пользовательский внешний ключ: worker_id
      ? Требуется промежуточная модель? No
      ? Разрешить вложение связей в API REST: Yes
      ? Отключить связь от следующих подключенных объектов: No

 #### create tables in db

      $ cd bin
      $ node automigrate-models.js
      this will drop and re-create the tables if they were created previously

 #### update tables in db

    $ cd bin
    $ node autoupdate-models.js
    If there are existing tables in a database, running automigrate() will drop and re-create the tables: Therefore, data will be lost. To avoid this problem, use autoupdate(). Instead of dropping tables and recreating them, autoupdate() calculates the difference between the LoopBack model and the database table definition and alters the table accordingly

    There is an issue for foreignKey setup with automigration, in db it is not supported for postgreSql
    https://github.com/strongloop/loopback-connector-postgresql/issues/348

    we can manually add foreignKey with this sql query

    ALTER TABLE article
    ADD CONSTRAINT fkey_article_in_worker FOREIGN KEY (worker_id)
        REFERENCES worker (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

    or run native-queries.js
    $ cd bin
    $ node native-queries.js

 #### login example

    {
      "username": "username3",
      "email": "email3@mail.ru",
      "password": "password"
    }

    response body

    {
      "id": "HWiRJgbN8HzNwmF1I9eOyvznlftfQxjqVla1XkI9d8fD9lZz0ED2sNCNz4lH4dkc",
      "ttl": 1209600,
      "created": "2019-11-06T08:41:14.258Z",
      "userId": 3
    }


    "HWiRJgbN8HzNwmF1I9eOyvznlftfQxjqVla1XkI9d8fD9lZz0ED2sNCNz4lH4dkc" is accessToken

 #### query examples

    to include related model (workers in get articles)

    /api/articles?filter={"include":"worker"}&access_token=GtFOoSSeU2USH2ve8FRF887IzMy4qINaF87zzvjxHcVk2iuYRiM9IRa5MCXv24w3

    response example


    [
      {
        "title": "title3",
        "content": "the content is empty",
        "author": "auther is not defined",
        "worker_id": 3,
        "id": 3,
        "worker": {
          "realm": null,
          "username": "username3",
          "email": "email3@mail.ru",
          "emailVerified": null,
          "id": 3
        }
      },
      {
        "title": "title4",
        "content": "the content is empty",
        "author": "auther is not defined",
        "worker_id": 3,
        "id": 6,
        "worker": {
          "realm": null,
          "username": "username3",
          "email": "email3@mail.ru",
          "emailVerified": null,
          "id": 3
        }
      }
    ]
