import { SQLDataSource } from 'datasource-sql';
import { User } from '../generated/graphql';

interface RawUser {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

function userReducer(user: RawUser): User {
    return {
        id: user.id.toString(),
        name: user.name,
    };
}

class UserAPI extends SQLDataSource {
    async getAllUsers(): Promise<Array<User>> {
        const users = await this.knex.select('*').from('users');
        return users.map(userReducer);
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.knex
            .select('*')
            .from('users')
            .where('id', id)
            .first();
        return userReducer(user);
    }

    async createUser(name: string): Promise<boolean> {
        try {
            await this.knex('users').insert({ name });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default UserAPI;
