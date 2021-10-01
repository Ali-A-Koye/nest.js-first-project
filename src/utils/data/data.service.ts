import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class DataService {
  constructor() {}

  filter(
    filters: Array<{ column: string; value: string }> = [],
    query: Knex.QueryBuilder,
    op: string = 'like',
  ) {
    filters.map(
      (filter): Knex.QueryBuilder =>
        query.andWhere(filter.column, op, `${filter.value}`),
    );
  }

  sorter(
    sortArray: Array<{ column: string; value: string }> = [],
    query: Knex.QueryBuilder,
  ) {
    sortArray.map(
      (sort): Knex.QueryBuilder => query.orderBy(sort.column, sort.value),
    );
  }
}
