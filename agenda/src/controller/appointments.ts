import { TypeAppointment } from "@/types/models";
import prisma from "@/lib/db";

export class AppointmentController{
    async createAppointment(content: TypeAppointment) {
            
            const appointment = await prisma.appointment.create({
                data: {
                    name: content.name,
                    cpf: content.cpf,
                    phone: content.phone,
                    notes: content.notes,
                    date: content.date,
                    time: content.time,
                    serviceId: content.serviceId
                }
            })
    
            return appointment;
    }

    async listAppointments(id?: number): Promise<TypeAppointment | TypeAppointment[]> {
        if(id){
            const result = await prisma.appointment.findUnique({
                where: {id}
            })

            if (result === null) {
                throw new Error('Appointment not found');
            }

            return result;
        }

        const result = await prisma.appointment.findMany();
        
        return result
    }

    async updateAppointment(id: number, content: TypeAppointment) {
        const appointment = await prisma.appointment.update({
            where: {id},
            data: {
                name: content.name,
                cpf: content.cpf,
                phone: content.phone,
                notes: content.notes,
                date: content.date,
                time: content.time,
                serviceId: content.serviceId
            }
        })

        return appointment;
    }

    async deleteAppointment(id: number) {
        const appointment = await prisma.appointment.delete({
            where: {id}
        })

        return appointment;
    }

    async customSearch(query: object) { 
            
        const appointments = await prisma.appointment.findMany(
            {
                where: query
            }    
        );
    
            return appointments;
    }
}