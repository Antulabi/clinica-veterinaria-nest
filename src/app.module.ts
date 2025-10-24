// modules.ts agrupa los diferentes modulos de la aplicacion.
import { Module } from '@nestjs/common';
import { DuenosModule } from './duenos/duenos.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { TurnosModule } from './turnos/turnos.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';

@Module({
  imports: [DuenosModule, MascotasModule, TurnosModule, TratamientosModule],
})
export class AppModule {}
