import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { Hospital } from './entities/hospital.entity';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  findAll(): Promise<Hospital[]> {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hospital | null> {
    return await this.hospitalService.findOne(+id);
  }

  @Post()
  create(@Body() hospital: Hospital): Promise<Hospital> {
    return this.hospitalService.create(hospital);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() hospital: Hospital): Promise<Hospital | null> {
    return await this.hospitalService.update(+id, hospital);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.hospitalService.remove(+id);
  }
}
