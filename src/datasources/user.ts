import { SQLDataSource } from 'datasource-sql';
import { User } from '../generated/graphql';

class UserAPI extends SQLDataSource {
    async getAllUsers() {
        const users = await this.knex.select('*').from('users');
        return users.map(this.userReducer);
    }

    userReducer(user: any): User {
        return {
            name: user.name,
        };
    }
}

export default UserAPI;
