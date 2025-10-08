import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateTurnoDto {
  @IsNotEmpty()
  mascotaId!: string;

  @IsISO8601()
  fechaHora!: string; // ISO string
}
