export class CreateAppointmentDto {
  date: string;
  time: string;
  reason: string;
  patientId: number;
  doctorId: number;
}