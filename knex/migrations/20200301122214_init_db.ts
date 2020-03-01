/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable('users');
}
