// Update with your config settings.

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'db',
            database: 'dev_db',
            user: 'dev_admin_user',
            password: 'dev_passwd',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
            tableName: 'knex_migrations',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'dev_db',
            user: 'dev_admin_user',
            password: 'dev_passwd',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
