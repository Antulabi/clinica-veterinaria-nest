import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DuenosService } from './duenos.service';
import { CreateDuenoDto } from './dto/create-dueno.dto';
// Controlador maneja las rutas y las peticiones HTTP
@Controller('duenos')
export class DuenosController {
  constructor(private readonly duenosService: DuenosService) {}

  @Get()
  listar() {
    return this.duenosService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.duenosService.obtenerPorId(id);
  }

  @Post()
  crear(@Body() dto: CreateDuenoDto) {
    return this.duenosService.crear(dto.nombre, dto.email, dto.telefono);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() cambios: Partial<CreateDuenoDto>) {
    return this.duenosService.actualizar(id, cambios);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    this.duenosService.eliminar(id);
    return { message: 'Dueño eliminado' };
  }
}
