import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from 'src/appointment/entities/appointment.entity';

export enum WorkerRole {
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  GUARD = 'GUARD',
}

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: WorkerRole,
  })
  role: WorkerRole;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
