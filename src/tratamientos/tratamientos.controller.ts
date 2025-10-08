import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly tratamientosService: TratamientosService) {}

  @Post()
  registrar(@Body() dto: CreateTratamientoDto) {
    return this.tratamientosService.registrar({
      mascotaId: dto.mascotaId,
      tipo: dto.tipo,
      descripcion: dto.descripcion,
      fecha: new Date(dto.fecha).toISOString(),
      nextDue: dto.nextDue ? new Date(dto.nextDue).toISOString() : undefined,
    });
  }

  @Get()
  listar() {
    return this.tratamientosService.listar();
  }

  @Get('mascota/:mascotaId')
  historial(@Param('mascotaId') mascotaId: string) {
    return this.tratamientosService.historialPorMascota(mascotaId);
  }

  @Get('consultas/chequeo-anual')
  clientesChequeoAnual() {
    return this.tratamientosService.clientesParaChequeoAnual();
  }

  @Get('consultas/vacunas-proximas')
  vacunasProximas(@Query('dias') dias?: string) {
    const d = dias ? parseInt(dias, 10) : 30;
    return this.tratamientosService.vacunasProximas(d);
  }
}
