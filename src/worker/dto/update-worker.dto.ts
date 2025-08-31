import { WorkerRole } from '../entities/worker.entity';

export class UpdateWorkerDto {
  fullName?: string;
  role?: WorkerRole;
}