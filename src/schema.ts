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

        testAuth: String!
    }

    type Mutation {
        loginUser(email: String!, password: String!): UserLogin # null if login failed
        createUser(name: String!, email: String!, password: String!): UserCreationResult!
    }

    type UserLogin {
        user: User!
        token: String!
    }

    type UserCreationResult {
        success: Boolean!
        message: String
    }
`;
