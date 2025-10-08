import { IsNotEmpty, IsISO8601, IsIn, IsOptional } from 'class-validator';

export class CreateTratamientoDto {
  @IsNotEmpty()
  mascotaId!: string;

  @IsIn(['diagnostico', 'vacuna', 'tratamiento', 'chequeo'])
  tipo!: 'diagnostico' | 'vacuna' | 'tratamiento' | 'chequeo';

  @IsNotEmpty()
  descripcion!: string;

  @IsISO8601()
  fecha!: string;

  @IsOptional()
  @IsISO8601()
  nextDue?: string; // para vacunas: fecha próxima vacuna (opcional)
}
