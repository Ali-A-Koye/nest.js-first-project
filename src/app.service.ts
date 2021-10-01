import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AppService {

  constructor(@InjectConnection() private readonly knex: Knex) {}

  
  async getHello(): Promise<object> {
    const users = await this.knex.table('users').insert({firstName:"ali",lastName:"amjad",email:"a@aa.com"});
    return { users };

  }
}
