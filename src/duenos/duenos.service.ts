import { Injectable, NotFoundException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { generarId } from '../common/utils/id.util';
import { MascotasService } from '../mascotas/mascotas.service'; // <--- Importar
// el service.ts es el encargado de la logica de negocio y manejo de datos.
export interface Dueno {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  createdAt: string;
}

@Injectable()
export class DuenosService {
  private duenos: Dueno[] = [];
constructor(
    // Inyectar MascotasService usando forwardRef
    @Inject(forwardRef(() => MascotasService))
    private readonly mascotasService: MascotasService,
  ) {}  

  listar(): Dueno[] {
    return this.duenos;
  }

  crear(nombre: string, email?: string, telefono?: string): Dueno {
    const d: Dueno = {
      id: generarId(),
      nombre,
      email,
      telefono,
      createdAt: new Date().toUTCString().toString(),
    };
    this.duenos.push(d);
    return d;
  }

  obtenerPorId(id: string): Dueno {
    const d = this.duenos.find(x => x.id === id);
    if (!d) throw new NotFoundException('Dueño no encontrado');
    return d;
  }
// actualizar dueño.
actualizar(id: string, cambios: Partial<Dueno>): Dueno {
    const d = this.obtenerPorId(id);

    // si el id viene en los cambios, los eliminamos para que no se puedan modificar.
    if (cambios.id) {
      delete cambios.id;
    }
    // si el createdAt viene en los cambios, lo eliminamos
    if (cambios.createdAt) {
      delete cambios.createdAt;
    }

    Object.assign(d, cambios);
    return d;
  }

eliminar(id: string): void {
    // --- LÓGICA MODIFICADA ---
    // 1. Validar si el dueño tiene mascotas
    const mascotas = this.mascotasService.listarPorDueno(id);
    if (mascotas.length > 0) {
      throw new BadRequestException('No se puede eliminar un dueño con mascotas asociadas.');
    }

    // 2. Si no tiene, proceder a eliminar
    const idx = this.duenos.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException('Dueño no encontrado');
    this.duenos.splice(idx, 1);
  }
}
