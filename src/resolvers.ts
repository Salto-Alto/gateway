import { Context } from './datasources';
import { IResolvers } from 'apollo-server-express';
import { Launch } from './generated/graphql';

const resolvers: IResolvers<Context> = {
    Query: {
        launches: (_, __, { dataSources }): Promise<Array<Launch>> => {
            return dataSources.launchAPI.getAllLaunches();
        },
        launch: (_, { id }, { dataSources }): Promise<Launch> => {
            return dataSources.launchAPI.getLaunchById(id);
        },
    },
};

export default resolvers;
