import { Module,forwardRef } from '@nestjs/common';
import { DuenosController } from './duenos.controller';
import { DuenosService } from './duenos.service';
import { MascotasModule } from '../mascotas/mascotas.module';
// Módulo agrupa el controlador y el servicio de dueños
@Module({
  imports: [
    // Permitir la importación circular
    forwardRef(() => MascotasModule) 
  ],
  controllers: [DuenosController],
  providers: [DuenosService],
  exports: [DuenosService],
})
export class DuenosModule {}
