// DTO (Data Transfer Object) sirve para como vamos a recibir los datos desde el backend
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateDuenoDto {
  @IsNotEmpty()
  nombre!: string;
  // @IsOptional es para que el campo no sea obligatorio
  @IsOptional()
  // isEmail valida que el formato sea de email
  @IsEmail()
  email?: string;

  @IsOptional()
  // IsPhoneNumber valida que el formato sea de numero telefonico
  @IsPhoneNumber()
  telefono?: string;
}
