// src/worker/worker.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workerService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWorkerDto) {
    return this.workerService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateWorkerDto) {
    return this.workerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workerService.remove(id);
  }
}
