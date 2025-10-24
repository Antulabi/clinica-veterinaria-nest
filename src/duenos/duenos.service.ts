import { Injectable, NotFoundException } from '@nestjs/common';
import { generarId } from '../common/utils/id.util';
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

  actualizar(id: string, cambios: Partial<Dueno>): Dueno {
    const d = this.obtenerPorId(id);
    Object.assign(d, cambios);
    return d;
  }

  eliminar(id: string): void {
    const idx = this.duenos.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException('Dueño no encontrado');
    this.duenos.splice(idx, 1);
  }
}
