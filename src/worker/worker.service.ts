// src/worker/worker.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepo: Repository<Worker>,
  ) {}

  findAll() {
    return this.workerRepo.find({ relations: ['appointments', 'appointments.patient'] });
  }

  findOne(id: number) {
    return this.workerRepo.findOne({ where: { id }, relations: ['appointments', 'appointments.patient'] });
  }

  create(dto: CreateWorkerDto) {
    const worker = this.workerRepo.create(dto);
    return this.workerRepo.save(worker);
  }

  async update(id: number, dto: UpdateWorkerDto) {
    await this.workerRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.workerRepo.delete(id);
  }
}
