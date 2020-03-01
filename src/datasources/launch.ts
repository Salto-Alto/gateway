import { RESTDataSource } from 'apollo-datasource-rest';
import { Launch } from '../generated/graphql';

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();

        this.baseURL = 'https://api.spacexdata.com/v2/';
    }

    async getAllLaunches(): Promise<Array<Launch>> {
        const response = await this.get('launches');
        return Array.isArray(response) ? response.map(this.launchReducer) : [];
    }

    async getLaunchById(launchId: number): Promise<Launch> {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const response = await this.get('launches', { flight_number: launchId });
        return this.launchReducer(response[0]);
    }

    getLaunchesById(launchIds: Array<number>): Promise<Array<Launch>> {
        return Promise.all(launchIds.map(this.getLaunchById));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    launchReducer(launch: any): Launch {
        return {
            id: launch.flight_number || 0,
            site: launch.launch_site && launch.launch_site.site_name,
        };
    }
}

export default LaunchAPI;
