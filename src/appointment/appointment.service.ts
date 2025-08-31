// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(Worker)
    private workerRepo: Repository<Worker>,
  ) {}

  async findAll() {
    return this.appointmentRepo.find({ relations: ['patient', 'doctor'] });
  }

  async findOne(id: number) {
    return this.appointmentRepo.findOne({ where: { id }, relations: ['patient', 'doctor'] });
  }

  async create(dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOneBy({ id: dto.patientId });
    const doctor = await this.workerRepo.findOneBy({ id: dto.doctorId });

    if (!patient) {
      throw new Error('Patient not found');
    }
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const appointment = this.appointmentRepo.create({
      date: dto.date,
      time: dto.time,
      reason: dto.reason,
      patient: patient,
      doctor: doctor,
    });

    const saved = await this.appointmentRepo.save(appointment);

    // Pseudocode: Notification
    console.log(`Doctor ${doctor.fullName} ga yangi appointment: ${patient.name} - ${dto.date} ${dto.time}`);
    console.log(`Patient ${patient.name} uchun notification: Doctor ${doctor.fullName} ga yozildingiz`);

    return saved;
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    const updateData: any = {};

    if (dto.date) updateData.date = dto.date;
    if (dto.time) updateData.time = dto.time;
    if (dto.reason) updateData.reason = dto.reason;
    if (dto.patientId) {
      const patient = await this.patientRepo.findOneBy({ id: dto.patientId });
      if (!patient) throw new Error('Patient not found');
      updateData.patient = patient;
    }
    if (dto.doctorId) {
      const doctor = await this.workerRepo.findOneBy({ id: dto.doctorId });
      if (!doctor) throw new Error('Doctor not found');
      updateData.doctor = doctor;
    }

    await this.appointmentRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.appointmentRepo.delete(id);
  }
}
