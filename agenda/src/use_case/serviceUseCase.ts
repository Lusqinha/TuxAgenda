import { ServiceController } from "@/controller/service";
import { TypeService } from "@/types/models";

export class ServiceUseCase{

    private controller: ServiceController;

    constructor() {
        this.controller = new ServiceController();
    }

    async createService(content: TypeService): Promise<TypeService> {
        return await this.controller.createService(content);
    }

    async listServices(id?: number): Promise<TypeService | TypeService[]> {
        return await this.controller.listServices(id);
    }

    async updateService(id: number, content: TypeService): Promise<TypeService> {
        return await this.controller.updateService(id, content);
    }

    async deleteService(id: number): Promise<TypeService> {
        return await this.controller.deleteService(id);
    }

}