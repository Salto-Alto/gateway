# Gateway

## Dependencies:

-   sqlite3 (for local db)

## Start

To run this application in local dev environment:

```
yarn install
yarn knex migrate:latest # to create the db and run migrations
yarn start
```

you can now use [the playground](localhost:3000/graphql)

## GraphQL Codegen

When developping on GraphQL schema please run

```
yarn run codegen
```

to update the typescript auto-generated types
