import {
  MinLength,
  IsBoolean,
  IsInt,
  IsOptional,
} from 'class-validator';

export class PostorPutDTO {
  @MinLength(3)
  name: string;

  @IsInt()
  price: number;

  @IsBoolean()
  is_sold: boolean;

  @IsBoolean()
  active: boolean;
}

export class ProductPatchDTO {
  @IsOptional()
  @IsBoolean()
  is_sold: boolean;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
