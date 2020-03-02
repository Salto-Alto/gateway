/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return await knex.schema.createTable('users', table => {
        table
            .increments('id')
            .primary()
            .notNullable();
        table.string('name').notNullable();
        table
            .string('email')
            .unique()
            .notNullable();
        table.string('password').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable('users');
}
