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
        createUser: async (_, { name }, { dataSources }): Promise<UserCreationResult> => {
            if (await dataSources.userAPI.createUser(name)) {
                return { success: true };
            } else {
                return { success: false, message: 'Error creation failed' };
            }
        },
    },
};

export default resolvers;
