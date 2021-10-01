import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isInt, IsOptional } from 'class-validator';

export class DataGridDto {
  @Transform(({ value }) => {
    if (!isInt(+value)) return 10;
    else return value > 0 ? +value : 10;
  })
  pageSize: number = 10;

  @Transform(({ value }): number => {
    if (!isInt(+value)) return 0;
    return value > 0 ? +value : 0;
  })
  page: number = 0;

  @Transform(({ value }) => {
    return value.map((val) => {
      val = val.split(':');
      if (!val[0] || !val[1])
        throw new UnprocessableEntityException(
          'Invalid Filter Format should be columnName:value',
        );
      else return { column: val[0], value: val[1] };
    });
  })
  filters?: Array<{ column: string; value: string }> = [];

  @Transform(({ value }) => {
    if (!value) return [];
    return value.map((val) => {
      val = val.split(':');
      if (!val[0] || !val[1]) return;
      return { column: val[0], value: val[1] };
    });
  })
  sortArray: Array<{ column: string; value: string }> = [];
}

export class DataListDto {
  @Transform(({ value }) => {
    if (!isInt(+value)) return 10;
    else return value > 0 ? +value : 10;
  })
  limit: number = 10;

  @Transform(({ value }): number => {
    if (!isInt(+value)) return 0;
    return value > 0 ? +value : 0;
  })
  offset: number = 0;

  @IsOptional()
  q: string;
}
