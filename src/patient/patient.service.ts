// src/patient/patient.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  findAll() {
    return this.patientRepo.find({ relations: ['appointments', 'appointments.doctor'] });
  }

  findOne(id: number) {
    return this.patientRepo.findOne({ where: { id }, relations: ['appointments', 'appointments.doctor'] });
  }

  create(dto: CreatePatientDto) {
    const patient = this.patientRepo.create(dto);
    return this.patientRepo.save(patient);
  }

  async update(id: number, dto: UpdatePatientDto) {
    await this.patientRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.patientRepo.delete(id);
  }
}
