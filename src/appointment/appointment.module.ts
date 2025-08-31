import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Worker } from '../worker/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Worker])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
