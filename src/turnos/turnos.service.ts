import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { generarId } from '../common/utils/id.util';
import { MascotasService } from '../mascotas/mascotas.service';

export interface Turno {
  id: string;
  mascotaId: string;
  fechaHora: string; // ISO
  motivo?: string;
  estado: 'agendado' | 'cancelado' | 'finalizado';
  createdAt: string;
}

@Injectable()
export class TurnosService {
  private turnos: Turno[] = [];

  constructor(private readonly mascotasService: MascotasService) {}

  listar(): Turno[] {
    return this.turnos;
  }

  agendar(mascotaId: string, fechaHoraIso: string, motivo?: string): Turno {
    // validar mascota existe
    this.mascotasService.obtenerPorId(mascotaId);

    const fecha = new Date(fechaHoraIso);
    if (isNaN(fecha.getTime())) throw new BadRequestException('Fecha inválida');
    const ahora = new Date();
    if (fecha < ahora) throw new BadRequestException('No se permiten turnos en fechas pasadas');

    const t: Turno = {
      id: generarId(),
      mascotaId,
      fechaHora: fecha.toISOString(),
      motivo,
      estado: 'agendado',
      createdAt: new Date().toISOString(),
    };
    this.turnos.push(t);
    return t;
  }

  obtenerPorId(id: string): Turno {
    const t = this.turnos.find(x => x.id === id);
    if (!t) throw new NotFoundException('Turno no encontrado');
    return t;
  }

  cancelar(id: string): Turno {
    const t = this.obtenerPorId(id);
    if (t.estado !== 'agendado') throw new BadRequestException('Solo turnos agendados pueden cancelarse');
    t.estado = 'cancelado';
    return t;
  }

  finalizar(id: string): Turno {
    const t = this.obtenerPorId(id);
    if (t.estado !== 'agendado') throw new BadRequestException('Solo turnos agendados pueden finalizarse');
    t.estado = 'finalizado';
    return t;
  }

  listarPorMascota(mascotaId: string): Turno[] {
    return this.turnos.filter(t => t.mascotaId === mascotaId);
  }
}
