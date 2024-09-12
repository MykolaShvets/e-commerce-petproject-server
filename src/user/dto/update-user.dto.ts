import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
