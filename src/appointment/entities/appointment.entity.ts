import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  reason: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: 'CASCADE' })
  patient: Patient;

  @ManyToOne(() => Worker, (worker) => worker.appointments, { onDelete: 'SET NULL' })
  doctor: Worker;
}
