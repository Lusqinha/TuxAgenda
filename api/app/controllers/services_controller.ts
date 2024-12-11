import type { HttpContext } from '@adonisjs/core/http'
import Service from '#models/service'

export default class ServicesController {

  async index({ response }: HttpContext) {
    const services = await Service.all()

    response.status(200)

    return response.json({
      data: services
    })
  }

  async show({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)

    response.status(200)

    return response.json({
      data: service
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()

    const service = await Service.create(data)

    response.status(201)

    return response.json({
      data: service
    })
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    const service = await Service.findOrFail(params.id)

    service.merge(data)

    await service.save()

    response.status(200)

    return response.json({
      data: service
    })
  }

  async destroy({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)

    await service.delete()

    response.status(204)
  }
  
  async colaborator({ }: HttpContext) {
    
  }
  
  async Appointment({ }: HttpContext) {
    
  }
  
}