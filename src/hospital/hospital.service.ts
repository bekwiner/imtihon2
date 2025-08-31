// src/hospital/hospital.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepo: Repository<Hospital>,
  ) {}

  findAll() {
    return this.hospitalRepo.find();
  }

  findOne(id: number) {
    return this.hospitalRepo.findOneBy({ id });
  }

  create(dto: CreateHospitalDto) {
    const hospital = this.hospitalRepo.create(dto);
    return this.hospitalRepo.save(hospital);
  }

  async update(id: number, dto: UpdateHospitalDto) {
    await this.hospitalRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.hospitalRepo.delete(id);
  }
}
