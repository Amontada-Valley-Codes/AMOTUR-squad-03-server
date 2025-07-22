import { Module } from '@nestjs/common';
import { MaresService } from './mares.service';
import { MaresController } from './mares.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [MaresService],
  controllers: [MaresController]
})
export class MaresModule {}
