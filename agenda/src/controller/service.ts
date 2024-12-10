import { TypeService } from "@/types/models";
import prisma from "@/lib/db";



export class ServiceController{

    async createService(content: TypeService) {
        
        const service = await prisma.service.create({
            data: {
                name: content.name,
                minutes_duration: content.minutes_duration,
                price: content.price
            }
        })

        return service;
    }

    async listServices(id?: number): Promise<TypeService | TypeService[] | []> {
        if(id){
            const result = await prisma.service.findUnique({
                where: {id}
            })

            if (result === null) {
              return [];
            }

            return result;
        }

        const result = await prisma.service.findMany();
        
        return result
    }

    async updateService(id: number, content: TypeService) {
        const service = await prisma.service.update({
            where: {id},
            data: {
                name: content.name,
                minutes_duration: content.minutes_duration,
                price: content.price
            }
        })

        return service;
    }

    async deleteService(id: number) {
        const service = await prisma.service.delete({
            where: {id}
        })

        return service;
    }

    async customQuery(query: object) {
        
        const service = await prisma.service.findMany(
            query
        )

    }



}