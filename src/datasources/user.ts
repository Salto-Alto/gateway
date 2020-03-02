import { SQLDataSource } from 'datasource-sql';
import { User } from '../generated/graphql';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

interface RawUser {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

function userReducer(user: RawUser): User {
    return {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
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
        if (!user) {
            return null;
        }
        return userReducer(user);
    }

    async createUser(name: string, email: string, password: string): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        try {
            await this.knex('users').insert({ name, email, password: hashedPassword });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const user = await this.knex('users')
            .where({ email })
            .first();

        if (!user) {
            return null;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // wrong password
            return null;
        }

        return userReducer(user);
    }
}

export default UserAPI;
