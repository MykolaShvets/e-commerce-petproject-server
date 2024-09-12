import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateItemDto {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  readonly name?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly sale?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly rate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly amount?: number;

  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;
}
