import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export interface AppointmentPOST{
    fullName: string;
    cpf: string;
    phone?: string;
    email?: string;
    serviceId: number;
    date: Date;
    notes?: string;
}

export async function GET() {
    const appointments = await prisma.appointment.findMany();

    return Response.json(appointments);
}

export async function POST(req: NextRequest) {
    
    const body: AppointmentPOST = await req.json();

    const data = {
        fullName: body.fullName,
        cpf: body.cpf,
        phone: body.phone,
        email: body.email,
        serviceId: body.serviceId,
        date: body.date,
        notes: body.notes
    }

    const appointment = await prisma.appointment.create({
        data: data
    });

    return Response.json(appointment);
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const  id = req.nextUrl.searchParams.get('id');

    const appointment = await prisma.appointment.update({
        where: { id: Number(id) },
        data: body
    });

    return Response.json(appointment);
}

export async function DELETE(req: NextRequest) {
    const  id = req.nextUrl.searchParams.get('id');

    const appointment = await prisma.appointment.delete({
        where: { id: Number(id) }
    });

    return Response.json(appointment);
}