import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]!
        userById(id: ID!): User
    }

    type Mutation {
        loginUser(email: String!, password: String!): User
        createUser(name: String!, email: String!, password: String!): UserCreationResult!
    }

    type UserCreationResult {
        success: Boolean!
        message: String
    }
`;
