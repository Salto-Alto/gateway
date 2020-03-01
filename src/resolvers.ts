import { Launch, QueryResolvers, User } from './generated/graphql';

interface Resolvers {
    Query: QueryResolvers;
}

const resolvers: Resolvers = {
    Query: {
        launches: (_, __, { dataSources }): Promise<Array<Launch>> => {
            return dataSources.launchAPI.getAllLaunches();
        },
        launch: (_, { id }, { dataSources }): Promise<Launch> => {
            return dataSources.launchAPI.getLaunchById(id);
        },
        allUsers: (_, __, { dataSources }): Promise<Array<User>> => {
            return dataSources.userAPI.getAllUsers();
        },
    },
};

export default resolvers;
