import { Knex } from 'knex';
import { DataService } from 'src/utils/data/data.service';
export declare class ProductService {
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
}
