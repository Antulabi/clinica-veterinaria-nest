import { IsNotEmpty, IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateDuenoDto {
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  telefono?: string;
}
