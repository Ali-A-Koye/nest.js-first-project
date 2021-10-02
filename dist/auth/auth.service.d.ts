import { Knex } from 'knex';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly knex;
    private readonly userService;
    constructor(knex: Knex, userService: UserService);
    login(username: string, password: string): Promise<Knex.QueryBuilder>;
    signup(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<{
        user: object;
        token: string;
    }>;
}
