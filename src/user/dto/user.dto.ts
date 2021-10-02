import { Expose } from 'class-transformer';
import {
    MinLength,
    IsBoolean,
    IsOptional,
    MaxLength,
  } from 'class-validator';
  export class PostorPutDTO {
    @MinLength(3)
    name: string;


    @MinLength(3)
    username: string;

    @MinLength(3)
    salt: string;

    @MinLength(6)
    @MaxLength(10)
    password: string;
  
    @IsBoolean()
    active: boolean;
  }
  
  export class userPatchDTO {

    @IsOptional()
    @IsBoolean()
    active: boolean;
  
    @IsOptional()
    @IsBoolean()
    deleted: boolean;
  }
  


  
  export class userSerializeDTO {

    @Expose()
    name: string;

    @Expose()
    username: string;


    @Expose()
    created_at: string;
  }
  