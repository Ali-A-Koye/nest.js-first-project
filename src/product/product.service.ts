import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { DataService } from 'src/utils/data/data.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly dataService: DataService,
  ) {}

  readDataGridQuery(
    pageSize: number,
    page: number,
    filters: Array<{ column: string; value: string }> = [],
    sortArray: Array<{ column: string; value: string }> = [],
  ): Array<Knex.QueryBuilder> {
    const db = this.knex;
    const filter = this.dataService.filter;
    const sorter = this.dataService.sorter;
    const records = db('product')
      .select('product.*', 'user.name as created_by_who')
      .leftJoin('user', 'user.id', 'product.created_by')
      .where('product.deleted', 0)
      .offset(pageSize * page)
      .limit(pageSize);

    filter(filters, records);
    if (sortArray.length === 0) records.orderBy('product.id', 'desc');
    sorter(sortArray, records);

    const recordsCount = db('product')
      .count({ count: 'product.id' })
      .where('product.deleted', 0);
    filter(filters, recordsCount);

    return [records, recordsCount];
  }
}
