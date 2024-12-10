import { AppointmentController } from "@/controller/appointments";
import { TypeAppointment } from "@/types/models";

export class AppointmentUseCase{

    private controller: AppointmentController;

    constructor() {
        this.controller = new AppointmentController();
    }

    async createAppointment(content: TypeAppointment): Promise<TypeAppointment> {
        return await this.controller.createAppointment(content);
    }

    async listAppointments(id?: number): Promise<TypeAppointment | TypeAppointment[]> {
        return await this.controller.listAppointments(id);
    }

    async updateAppointment(id: number, content: TypeAppointment): Promise<TypeAppointment> {
        return await this.controller.updateAppointment(id, content);
    }

    async deleteAppointment(id: number): Promise<TypeAppointment> {
        return await this.controller.deleteAppointment(id);
    }

    async checkAvailability(content: TypeAppointment): Promise<boolean> { 
        const used_appointments = await this.controller.customSearch({
            date: content.date,
            time: content.time,
            serviceId: content.serviceId
        });

        if(used_appointments.length === 0){
            return true;
        }

        return false;

    }

    async listAvaliableHours(date: string, serviceId: number, all_hours:string[]): Promise<string[]> { 
        const used_appointments = await this.controller.customSearch({
            date: date,
            serviceId: serviceId
        });

        const used_hours = used_appointments.map(appointment => appointment.time);

        const avaliable_hours = all_hours.filter(hour => !used_hours.includes(hour));

        return avaliable_hours;
    }

}