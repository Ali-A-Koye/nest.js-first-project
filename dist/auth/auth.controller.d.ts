import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDTO): Promise<import("knex").Knex.QueryBuilder<any, any>>;
    signup(body: SignupDTO): Promise<{
        user: object;
        token: string;
    }>;
}
