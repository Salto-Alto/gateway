declare module 'datasource-sql' {
    import { DataSource } from 'apollo-datasource';
    import knex from 'knex';

    export class SQLDataSource extends DataSource {
        knex: knex;

        constructor(config: unknown);
    }
}
