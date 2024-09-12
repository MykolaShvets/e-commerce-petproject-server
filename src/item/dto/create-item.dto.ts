import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsOptional()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly sales: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly rate: number;

  @IsNumber()
  @Min(0)
  readonly amount: number;

  @IsUrl()
  readonly imageUrl: string;
}
