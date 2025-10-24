import { Module } from '@nestjs/common';
import { DuenosController } from './duenos.controller';
import { DuenosService } from './duenos.service';
// Módulo agrupa el controlador y el servicio de dueños
@Module({
  controllers: [DuenosController],
  providers: [DuenosService],
  exports: [DuenosService],
})
export class DuenosModule {}
