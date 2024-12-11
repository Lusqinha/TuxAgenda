import AppointmentReserved from '#models/appointment_reserved'
import Appointment from '#models/appointment'

import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';

export default class AppointmentsController {

    public async index({ response }: HttpContext) {
        const appointments = await Appointment.all()

        response.status(200)

        return response.json({
            data: appointments
        })
    }

    public async show({ params, response }: HttpContext) {
        const appointment = await Appointment.findOrFail(params.id)

        response.status(200)

        return response.json({
            data: appointment
        })
    }

    public async store({ request, response }: HttpContext) {
        const data = request.all()

        const appointment = await Appointment.create(data)


        const hour = DateTime.fromISO(appointment.datahora_inicio_agendamento.toString()).toFormat('HH:mm');

        const reservedData = {
            data: appointment.datahora_inicio_agendamento,
            hora: hour,
            appointment_id: appointment.id,
        }

        const appointmentReserved = await AppointmentReserved.create(reservedData)

        response.status(201)

        return response.json({
            data: appointment,
            reserved: appointmentReserved
        })
    }

    public async update({ params, request, response }: HttpContext) {
        const data = request.all()

        const appointment = await Appointment.findOrFail(params.id)

        appointment.merge(data)

        await appointment.save()

        response.status(200)

        return response.json({
            data: appointment
        })
    }

    public async destroy({ params, response }: HttpContext) {
        const appointment = await Appointment.findOrFail(params.id)

        await appointment.delete()

        response.status(204)
    }


}