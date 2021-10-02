import { Knex } from 'knex';
import { DataService } from 'src/utils/data/data.service';
export declare class UserService {
    private readonly knex;
    private readonly dataService;
    constructor(knex: Knex, dataService: DataService);
    readDataGridQuery(pageSize: number, page: number, filters?: Array<{
        column: string;
        value: string;
    }>, sortArray?: Array<{
        column: string;
        value: string;
    }>): Array<Knex.QueryBuilder>;
    readListQuery(limit: number, offset: number): Knex.QueryBuilder;
    readSingleQuery(id: number): Knex.QueryBuilder;
    create(body: any): Knex.QueryBuilder;
    update(id: any, body: any): Knex.QueryBuilder;
    patch(id: any, body: any): Knex.QueryBuilder;
}
