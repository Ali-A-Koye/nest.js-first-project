import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

  readListQuery(limit: number, offset: number): Knex.QueryBuilder {
    const db = this.knex;

    return db('product')
      .select('product.*', 'user.name as created_by_who')
      .leftJoin('user', 'user.id', 'product.created_by')
      .where('product.deleted', 0)
      .limit(limit)
      .offset(offset);
  }

  readSingleQuery(id: number): Knex.QueryBuilder {
    const db = this.knex;

    return db('product')
      .select('product.*', 'user.name as created_by_who')
      .leftJoin('user', 'user.id', 'product.created_by')
      .where('product.deleted', 0)
      .andWhere('product.id', id);
  }

  create(body): Knex.QueryBuilder {
    const db = this.knex;

    return db('product').insert({
      name: body.name,
      price: body.price,
      is_sold: body.is_sold,
      active: body.active,
      created_at: db.fn.now(),
      created_by: 1,
    });
  }

  update(id, body): Knex.QueryBuilder {
    const db = this.knex;

    return db('product')
      .update({
        name: body.name,
        price: body.price,
        is_sold: body.is_sold,
        active: body.active,
        created_at: db.fn.now(),
        created_by: 1,
      })
      .where('id', id);
  }

  patch(id, body): Knex.QueryBuilder {
    const db = this.knex;
    const updateOb:any = {};

		if (body.deleted !== undefined) updateOb.deleted = body.deleted;
    if (body.is_sold !== undefined) updateOb.is_sold = body.is_sold;
		if (body.active !== undefined) updateOb.active = body.active;
		if (Object.entries(body).length === 0) throw new UnprocessableEntityException();

    return db('product')
      .update(updateOb)
      .where('id', id);
  }
}
