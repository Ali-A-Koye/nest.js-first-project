import {MinLength,IsBoolean, IsInt, Min, IsNumberString } from "class-validator";

export class PostorPutDTO {
    @MinLength(3)
    name: string;

    @IsInt()
    price:number;

    @IsBoolean()
    is_sold:boolean;

    @IsBoolean()
    active:boolean;

  }


  

