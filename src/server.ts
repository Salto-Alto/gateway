import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import UserAPI from './datasources/user';
import knexConfig from '../knex/config';
import jwt from 'jsonwebtoken';

console.log(process.env.JWT_SECRET);

const server = new ApolloServer({
    typeDefs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: resolvers as any,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dataSources: () => ({
        userAPI: new UserAPI(knexConfig),
    }),
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    context: ({ req }) => {
        const auth = req.headers.authorization;
        const token = auth?.replace(/^Bearer\s/, '');
        if (!token) {
            return {};
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
            console.log(payload);
            return { id: payload.id };
        } catch {
            return {};
        }
    },
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.NODE_PORT;

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
