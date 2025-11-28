import type { HttpContext } from '@adonisjs/core/http'
import RegisterParticipantUseCase from '../use_cases/register_participant_use_case.js'

export default class RegistrationsController {
  public async store({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const eventId = params.id

    try {
      const useCase = new RegisterParticipantUseCase()
      await useCase.execute(eventId, user)

      return response.created({ message: 'Successfully registered for the event' })
    } catch (error) {
      console.log(error)
      if (error.message === 'Event not found') return response.notFound({ message: error.message })
      if (error.message === 'Event is full') return response.badRequest({ message: error.message })
      if (error.message.includes('Time conflict')) return response.conflict({ message: error.message })

      return response.badRequest({ message: 'Already registered or database error' })
    }
  }
}
