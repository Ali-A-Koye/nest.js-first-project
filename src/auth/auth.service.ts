import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import sha1 from 'sha1';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly userService: UserService,
  ) {}

  async login(username: string, password: string): Promise<Knex.QueryBuilder> {
    const db = this.knex;

    return db.transaction(async (trx) => {
      const [user]: Array<any> = await trx('user')
        .select()
        .where('username', username)
        .andWhere('active', 1)
        .andWhere('deleted', 0)
        .limit(1);
      if (!user || !user.id)
        throw new UnauthorizedException('Invalid Username');

      const [userWithPassword]: Array<any> = await trx('user')
        .where('user.id', user.id)
        .andWhere('password', sha1(user.salt + password))
        .limit(1);

      if (!userWithPassword || !userWithPassword.id)
        throw new UnauthorizedException('Invalid Password');

      const token = jwt.sign({ ...userWithPassword }, process.env.JWT_SECRET, {
        expiresIn: '362d',
      });

      return {
        user: userWithPassword,
        token: token,
      };
    });
  }

  async signup(data: {
    name: string;
    username: string;
    password: string;
  }): Promise<{ user: object; token: string }> {
    const salt = 'erf3443rr44r';

    let { name, username, password } = data;

    password = sha1(salt + password);

    await this.userService.create({
      name,
      username,
      password,
      active: true,
      salt,
    });

    const token = jwt.sign({ name, username }, process.env.JWT_SECRET, {
      expiresIn: '362d',
    });

    return {
      user: { name, username },
      token: token,
    };
  }
}
