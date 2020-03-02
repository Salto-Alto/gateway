import UserAPI from './user';

export type Context = {};

export default interface DataSources {
    userAPI: UserAPI;
}
