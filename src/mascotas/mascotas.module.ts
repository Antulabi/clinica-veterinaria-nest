import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { DuenosModule } from '../duenos/duenos.module';

@Module({
  imports: [DuenosModule],
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}
