import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidator } from '#validators/event'
import CreateEventUseCase from '../use_cases/create_event_use_case.js'
import Event from '#models/event'

export default class EventsController {
  public async store({ request, response, auth }: HttpContext) {
    const user = auth.user!

    const data = await request.validateUsing(createEventValidator)

    try {
      const useCase = new CreateEventUseCase()
      const event = await useCase.execute(data, user)

      return response.created(event)
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        return response.forbidden({ message: error.message })
      }
      return response.badRequest({ message: error.message })
    }
  }

  public async show({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const event = await Event.find(params.id)

    if (!event) return response.notFound({ message: 'Event not found' })

    await event.load('organizer')

    if (user.id === event.organizerId) {
      await event.load('participants')
    }

    return response.ok(event)
  }

  public async update({ params, request, response, auth }: HttpContext) {
    const user = auth.user!
    const event = await Event.find(params.id)

    if (!event) return response.notFound({ message: 'Event not found' })

    if (event.organizerId !== user.id) {
      return response.forbidden({ message: 'Unauthorized' })
    }

    event.merge(request.all())
    await event.save()

    return response.ok(event)
  }

  public async destroy({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const event = await Event.find(params.id)

    if (!event) return response.notFound({ message: 'Event not found' })

    if (event.organizerId !== user.id) {
      return response.forbidden({ message: 'Unauthorized' })
    }

    await event.delete()
    return response.noContent()
  }

  public async index({ response }: HttpContext) {
    const events = await Event.query().preload('organizer')
    return response.ok(events)
  }
}
