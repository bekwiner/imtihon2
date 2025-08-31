import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsInt()
  hospitalId: number;
}
