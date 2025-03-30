import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Category } from '@prisma/client';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(Category)
  category: Category;

  @IsNumber()
  paidById: number;

  @IsArray()
  involvedUsers: number[];

  @IsDateString()
  timestamp: string;
}

export class EditExpenseDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsArray()
  involvedUsers?: number[];

  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
