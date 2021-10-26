import { MinLength, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  username: string;

  @MinLength(6)
  @IsString()
  password: string;
}

export class SignupDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @MinLength(6)
  @IsString()
  password: string;
}
