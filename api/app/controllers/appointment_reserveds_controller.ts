import type { HttpContext } from '@adonisjs/core/http'
import AppointmentReserved from '#models/appointment_reserved'

export default class AppointmentReservedsController {

    public async index({ response }: HttpContext) {
        const appointment_reserveds = await AppointmentReserved.all()

        response.status(200)

        return response.json({
            data: appointment_reserveds
        })
    }

    public async show({ response, params }: HttpContext) {
        const appointment_reserved = await AppointmentReserved.find(params.id)

        response.status(200)

        return response.json({
            data: appointment_reserved
        })
    }

    public async destroy({ response, params }: HttpContext) { 
        const appointment_reserved = await AppointmentReserved.findOrFail(params.id)

        await appointment_reserved.delete()

        response.status(204)

        return response.json({
            message: 'Vaga removida com sucesso'
        })
    }

    public async checkVacancy({ request, response }: HttpContext) {

        const body = request.body()

        const appointment_reserved_days = await AppointmentReserved.findManyBy('data', body.data)
        
        const appointment_reserved_hour = appointment_reserved_days.filter((appointment_reserved) => { 
            return appointment_reserved.hora === body.hora
        })

        if (appointment_reserved_hour.length === 0) {
            response.status(200)
            return response.json({
                message: 'Vaga disponivel',
                vacancy: true
            })
        }

        response.status(200)
        return response.json({
            message: 'Vaga indisponivel',
            vacancy: false
        })

    }
}