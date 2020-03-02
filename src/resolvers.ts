import { QueryResolvers, User, MutationResolvers, UserCreationResult, UserLogin } from './generated/graphql';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

interface Resolvers {
    Query: QueryResolvers;
    Mutation: MutationResolvers;
}

const resolvers: Resolvers = {
    Query: {
        users: (_, __, { dataSources }): Promise<Array<User>> => {
            return dataSources.userAPI.getAllUsers();
        },
        userById: (_, { id }, { dataSources }): Promise<User | null> => {
            return dataSources.userAPI.getUserById(id);
        },
        testAuth: async (_, __, context): Promise<string> => {
            if (!context.id) {
                throw new AuthenticationError('auth error');
            }
            return 'ok';
        },
    },
    Mutation: {
        createUser: async (_, { name, email, password }, { dataSources }): Promise<UserCreationResult> => {
            if (await dataSources.userAPI.createUser(name, email, password)) {
                return { success: true };
            } else {
                return { success: false, message: 'Error creation failed' };
            }
        },
        loginUser: async (_, { email, password }, { dataSources }): Promise<UserLogin | null> => {
            const user = await dataSources.userAPI.loginUser(email, password);
            if (!user) {
                return null;
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: '3h',
            });

            return {
                user,
                token,
            };
        },
    },
};

export default resolvers;
