import { Module } from '@nestjs/common';
import { DuenosController } from './duenos.controller';
import { DuenosService } from './duenos.service';

@Module({
  controllers: [DuenosController],
  providers: [DuenosService],
  exports: [DuenosService],
})
export class DuenosModule {}
