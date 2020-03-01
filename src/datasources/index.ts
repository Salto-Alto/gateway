import LaunchAPI from './launch';
import UserAPI from './user';

export type Context = {};

export default interface DataSources {
    launchAPI: LaunchAPI;
    userAPI: UserAPI;
}
