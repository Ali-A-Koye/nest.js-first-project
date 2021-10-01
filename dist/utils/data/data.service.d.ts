import { Knex } from 'knex';
export declare class DataService {
    constructor();
    filter(filters: Array<{
        column: string;
        value: string;
    }>, query: Knex.QueryBuilder, op?: string): void;
    sorter(sortArray: Array<{
        column: string;
        value: string;
    }>, query: Knex.QueryBuilder): void;
}
