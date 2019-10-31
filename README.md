# The app is created by node.js/LoopBack, PostgreSQL

  ### The steps to create and develop the app
 &NewLine;
 #### Create the initial app

     $ lb
     ? Укажите имя приложения: loopback-auth-chat-postgres
     ? Введите имя каталога, в котором будет располагаться проект: loopback-auth-chat-postgres
     ? Какую версию LoopBack требуется использовать? 3.x (Active Long Term Support)
     ? Какой вид приложения требуется создать? empty-server (Пустой API LoopBack без настроенных моделей и источников данных)

 #### Setup datasource

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

        ? Введите имя свойства: worker_id
        ? Тип свойства: number
        ? Является ли обязательным? No
        ? Значение по умолчанию [оставьте пустое поле, если значения нет]:


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
      $ node remote-models-automigrate.js
