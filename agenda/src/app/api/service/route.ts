import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export interface ServicePOST{
    name: string;
    description?: string;
    price: number;
    duration: number;
}

export async function GET(req: NextRequest) {

    if(req.nextUrl.searchParams.get('id')){
        const id = req.nextUrl.searchParams.get('id');
        const service = await prisma.service.findUnique({
            where: { id: Number(id) }
        });

        return Response.json(service);
    }

    const appointments = await prisma.appointment.findMany();

    return Response.json(appointments);
}


export async function POST(req: NextRequest) {
    
    const body: ServicePOST = await req.json();

    const data:ServicePOST = {
        name: body.name,
        description: body.description,
        price: body.price,
        duration: body.duration
    }

    const service = await prisma.service.create({
        data: data
    });

    return Response.json(service);
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const  id = req.nextUrl.searchParams.get('id');

    const service = await prisma.service.update({
        where: { id: Number(id) },
        data: body
    });

    return Response.json(service);
}

export async function DELETE(req: NextRequest) {
    const  id = req.nextUrl.searchParams.get('id');

    const service = await prisma.service.delete({
        where: { id: Number(id) }
    });

    return Response.json(service);
}
