import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }

    type Query {
        users: [User]!
        userById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!): UserCreationResult!
    }

    type UserCreationResult {
        success: Boolean!
        message: String
    }
`;
