import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Launch {
        id: ID!
        site: String
    }

    type User {
        name: String!
    }

    type Query {
        launches: [Launch]!
        launch(id: ID!): Launch

        allUsers: [User]!
    }
`;
