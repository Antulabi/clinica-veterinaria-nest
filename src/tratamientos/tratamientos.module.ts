import { Module } from '@nestjs/common';
import { TratamientosController } from './tratamientos.controller';
import { TratamientosService } from './tratamientos.service';
import { MascotasModule } from '../mascotas/mascotas.module';
import { DuenosModule } from '../duenos/duenos.module';

@Module({
  imports: [MascotasModule, DuenosModule],
  controllers: [TratamientosController],
  providers: [TratamientosService],
})
export class TratamientosModule {}
