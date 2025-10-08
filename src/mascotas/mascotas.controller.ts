import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  listar(@Query('duenoId') duenoId?: string) {
    if (duenoId) return this.mascotasService.listarPorDueno(duenoId);
    return this.mascotasService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.mascotasService.obtenerPorId(id);
  }

  @Post()
  crear(@Body() dto: CreateMascotaDto) {
    return this.mascotasService.crear({
      nombre: dto.nombre,
      especie: dto.especie,
      raza: dto.raza,
      sexo: dto.sexo,
      duenoId: dto.duenoId,
    });
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() cambios: Partial<CreateMascotaDto>) {
    return this.mascotasService.actualizar(id, cambios);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    this.mascotasService.eliminar(id);
    return { message: 'Mascota eliminada' };
  }
}
