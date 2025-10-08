import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateMascotaDto {
  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  especie!: string; // e.g., 'perro', 'gato'

  @IsOptional()
  raza?: string;

  @IsOptional()
  @IsIn(['M', 'F'])
  sexo?: 'M' | 'F';

  @IsNotEmpty()
  duenoId!: string;
}
