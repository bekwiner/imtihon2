import { WorkerRole } from '../entities/worker.entity';

export class CreateWorkerDto {
  fullName: string;
  role: WorkerRole;
}
