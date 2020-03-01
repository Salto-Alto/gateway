import LaunchAPI from "./datasources/launch";
import IDataSources from "./datasources";

export default {
    Query: {
        launches: (_: any, __: any, { dataSources }: { dataSources: IDataSources }) => {
            return dataSources.launchAPI.getAllLaunches();
        },
        launch: (_: any, { id }: { id: number }, { dataSources }: { dataSources: IDataSources }) => {
            return dataSources.launchAPI.getLaunchById(id);
        }
    }
}