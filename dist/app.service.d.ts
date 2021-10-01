import { Knex } from 'knex';
export declare class AppService {
    private readonly knex;
    constructor(knex: Knex);
    getHello(): Promise<object>;
}
