import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';
import { PatientsModule } from './patient/patient.module';
import { WorkersModule } from './worker/worker.module';
import { AppointmentModule } from './appointment/appointment.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // sizning postgres username
      password: '123456', // sizning postgres password
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    HospitalModule,
    PatientsModule,
    WorkersModule,
    AppointmentModule,
  ],
})
export class AppModule {}
