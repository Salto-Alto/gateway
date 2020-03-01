import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import LaunchAPI from './datasources/launch';
import resolvers from './resolvers';
import UserAPI from './datasources/user';

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3',
    },
};

const server = new ApolloServer({
    typeDefs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: resolvers as any,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI(knexConfig),
    }),
});

const app = express();
server.applyMiddleware({ app });

const port = 3000;

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
