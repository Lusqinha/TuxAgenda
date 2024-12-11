import type { HttpContext } from '@adonisjs/core/http'
import Colaborator from '#models/colaborator'

export default class ColaboratorsController {
    
    public async index({ response }: HttpContext) {
        const colaborators = await Colaborator.all()

        response.status(200)

        return response.json({
            data: colaborators
        })
    }

    public async show({ params, response }: HttpContext) {
        const colaborator = await Colaborator.findOrFail(params.id)

        response.status(200)

        return response.json({
            data: colaborator
        })
    }

    public async store({ request, response }: HttpContext) {
        const data = request.all()

        const colaborator = await Colaborator.create(data)

        response.status(201)

        return response.json({
            data: colaborator
        })
    }

    public async update({ params, request, response }: HttpContext) {
        const data = request.all()

        const colaborator = await Colaborator.findOrFail(params.id)

        colaborator.merge(data)

        await colaborator.save()

        response.status(200)

        return response.json({
            data: colaborator
        })
    }

    public async destroy({ params, response }: HttpContext) {
        const colaborator = await Colaborator.findOrFail(params.id)

        await colaborator.delete()

        response.status(204)

        return response.json({
            message: 'Colaborator deleted',
            data: colaborator
        })
    }
    
}