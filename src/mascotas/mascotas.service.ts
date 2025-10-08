import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { generarId } from '../common/utils/id.util';
import { DuenosService } from '../duenos/duenos.service';

export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza?: string;
  sexo?: 'M' | 'F';
  duenoId: string;
  createdAt: string;
}

@Injectable()
export class MascotasService {
  private mascotas: Mascota[] = [];

  constructor(private readonly duenosService: DuenosService) {}

  listar(): Mascota[] {
    return this.mascotas;
  }

  crear(data: Omit<Mascota, 'id' | 'createdAt'>): Mascota {
    // validar dueño existe
    this.duenosService.obtenerPorId(data.duenoId);

    const m: Mascota = {
      id: generarId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.mascotas.push(m);
    return m;
  }

  obtenerPorId(id: string): Mascota {
    const m = this.mascotas.find(x => x.id === id);
    if (!m) throw new NotFoundException('Mascota no encontrada');
    return m;
  }

  listarPorDueno(duenoId: string): Mascota[] {
    return this.mascotas.filter(m => m.duenoId === duenoId);
  }

  actualizar(id: string, cambios: Partial<Mascota>): Mascota {
    const m = this.obtenerPorId(id);
    if (cambios.duenoId) {
      // validar nuevo dueño
      this.duenosService.obtenerPorId(cambios.duenoId);
    }
    Object.assign(m, cambios);
    return m;
  }

  eliminar(id: string): void {
    const idx = this.mascotas.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException('Mascota no encontrada');
    this.mascotas.splice(idx, 1);
  }
}
