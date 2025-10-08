import { Module } from '@nestjs/common';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { MascotasModule } from '../mascotas/mascotas.module';

@Module({
  imports: [MascotasModule],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
