import { Injectable, NotFoundException } from '@nestjs/common';
import { generarId } from '../common/utils/id.util';
import { MascotasService } from '../mascotas/mascotas.service';
import { DuenosService } from '../duenos/duenos.service';

export interface Tratamiento {
  id: string;
  mascotaId: string;
  tipo: 'diagnostico' | 'vacuna' | 'tratamiento' | 'chequeo';
  descripcion: string;
  fecha: string; // ISO
  nextDue?: string; // ISO, sólo para vacunas
  createdAt: string;
}

@Injectable()
export class TratamientosService {
  private tratamientos: Tratamiento[] = [];

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly duenosService: DuenosService,
  ) {}

  registrar(tr: Omit<Tratamiento, 'id' | 'createdAt'>) {
    // validar mascota existe
    const mascota = this.mascotasService.obtenerPorId(tr.mascotaId);
    // optional: validate dueno exists as well (mascota has duenoId)
    this.duenosService.obtenerPorId(mascota.duenoId);

    const t: Tratamiento = {
      id: generarId(),
      ...tr,
      createdAt: new Date().toISOString(),
    };
    this.tratamientos.push(t);
    return t;
  }

  historialPorMascota(mascotaId: string): Tratamiento[] {
    // validar mascota existe
    this.mascotasService.obtenerPorId(mascotaId);
    return this.tratamientos.filter(x => x.mascotaId === mascotaId).sort((a,b) => +new Date(b.fecha) - +new Date(a.fecha));
  }

  listar(): Tratamiento[] {
    return this.tratamientos;
  }

  // Consultas especiales:
  // 1) dueños que deben chequeo anual -> si la mascota no tiene 'chequeo' en los últimos 365 días
  clientesParaChequeoAnual(): { duenoId: string; duenoNombre: string; mascotaId: string; mascotaNombre: string; lastCheckup?: string }[] {
    const resultado: { duenoId: string; duenoNombre: string; mascotaId: string; mascotaNombre: string; lastCheckup?: string }[] = [];
    const mascotas = this.mascotasService.listar();
    const hoy = new Date();

    for (const m of mascotas) {
      const checks = this.tratamientos
        .filter(t => t.mascotaId === m.id && t.tipo === 'chequeo')
        .sort((a,b) => +new Date(b.fecha) - +new Date(a.fecha));
      const last = checks[0];
      const needs = !last || (hoy.getTime() - new Date(last.fecha).getTime()) > 365 * 24 * 3600 * 1000;
      if (needs) {
        const dueno = this.duenosService.obtenerPorId(m.duenoId);
        resultado.push({
          duenoId: dueno.id,
          duenoNombre: dueno.nombre,
          mascotaId: m.id,
          mascotaNombre: m.nombre,
          lastCheckup: last?.fecha,
        });
      }
    }
    return resultado;
  }

  // 2) vacunas próximas -> lista dueños cuya mascota tiene nextDue (vacuna) dentro de
  //  X días (por defecto 30)
  vacunasProximas(dias = 30): { duenoId: string; duenoNombre: string; mascotaId: string; mascotaNombre: string; nextDue: string }[] {
    const resultado: { duenoId: string; duenoNombre: string; mascotaId: string; mascotaNombre: string; nextDue: string }[] = [];
    const hoy = new Date();
    const limite = new Date(hoy.getTime() + dias * 24 * 3600 * 1000);

    // para cada mascota, busca el registro de vacuna con nextDue más cercano en el futuro
    const mascotas = this.mascotasService.listar();
    for (const m of mascotas) {
      const vacunas = this.tratamientos
        .filter(t => t.mascotaId === m.id && t.tipo === 'vacuna' && t.nextDue)
        .sort((a,b) => +new Date(a.nextDue!) - +new Date(b.nextDue!));
      if (vacunas.length === 0) continue;
      const next = vacunas[0].nextDue!;
      const nextDate = new Date(next);
      if (nextDate >= hoy && nextDate <= limite) {
        const dueno = this.duenosService.obtenerPorId(m.duenoId);
        resultado.push({
          duenoId: dueno.id,
          duenoNombre: dueno.nombre,
          mascotaId: m.id,
          mascotaNombre: m.nombre,
          nextDue: next,
        });
      }
    }
    return resultado;
  }
}
