// src/hospital/hospital.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hospitalService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateHospitalDto) {
    return this.hospitalService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateHospitalDto) {
    return this.hospitalService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hospitalService.remove(id);
  }
}
