import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  listar() {
    return this.turnosService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.turnosService.obtenerPorId(id);
  }

  @Post()
  agendar(@Body() dto: CreateTurnoDto) {
    return this.turnosService.agendar(dto.mascotaId, dto.fechaHora);
  }

  @Post(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.turnosService.cancelar(id);
  }

  @Post(':id/finalizar')
  finalizar(@Param('id') id: string) {
    return this.turnosService.finalizar(id);
  }
}
