import { QueryResolvers, User, MutationResolvers, UserCreationResult } from './generated/graphql';

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
    },
    Mutation: {
        createUser: async (_, { name, email, password }, { dataSources }): Promise<UserCreationResult> => {
            if (await dataSources.userAPI.createUser(name, email, password)) {
                return { success: true };
            } else {
                return { success: false, message: 'Error creation failed' };
            }
        },
        loginUser: (_, { email, password }, { dataSources }): Promise<User | null> => {
            return dataSources.userAPI.loginUser(email, password);
        },
    },
};

export default resolvers;
