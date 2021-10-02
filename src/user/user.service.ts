import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { DataService } from 'src/utils/data/data.service';
@Injectable()
export class UserService {
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
    const records = db('user')
      .select('user.*')
      .where('user.deleted', 0)
      .offset(pageSize * page)
      .limit(pageSize);

    filter(filters, records);
    if (sortArray.length === 0) records.orderBy('user.id', 'desc');
    sorter(sortArray, records);

    const recordsCount = db('user')
      .count({ count: 'user.id' })
      .where('user.deleted', 0);
    filter(filters, recordsCount);

    return [records, recordsCount];
  }

  readListQuery(limit: number, offset: number): Knex.QueryBuilder {
    const db = this.knex;

    return db('user')
      .select('user.*')
      .where('user.deleted', 0)
      .limit(limit)
      .offset(offset);
  }

  readSingleQuery(id: number): Knex.QueryBuilder {
    const db = this.knex;

    return db('user')
      .select('user.*')
      .where('user.deleted', 0)
      .andWhere('user.id', id);
  }

  create(body): Knex.QueryBuilder {
    const db = this.knex;

    return db('user').insert({
      name: body.name,
      username: body.username,
      password: body.password,
      active: body.active,
      created_at: db.fn.now(),
      created_by: 1,
    });
  }

  update(id, body): Knex.QueryBuilder {
    const db = this.knex;

    return db('user')
      .update({
        name: body.name,
        username: body.username,
        password: body.password,
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
		if (body.active !== undefined) updateOb.active = body.active;
		if (Object.entries(body).length === 0) throw new UnprocessableEntityException();

    return db('user')
      .update(updateOb)
      .where('id', id);
  }
}
