export interface TypeService{
    id?: number;
    name: string;
    minutes_duration: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
    appointments?: TypeAppointment[];
}

export interface TypeAppointment{
    id?: number;
    name: string;
    cpf: string;
    phone: string;
    notes?: string | null;
    date: Date;
    time: string;
    serviceId: number;
    service?: TypeService;
    createdAt?: Date;
}