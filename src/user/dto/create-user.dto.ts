import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  readonly firstName: string;

  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$', '', {
    message:
      'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly role: string;
}
