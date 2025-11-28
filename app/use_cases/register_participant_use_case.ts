import EventsRepository from '../repositories/events_repository.js'
import User from '#models/user'

export default class RegisterParticipantUseCase {
  private eventsRepository = new EventsRepository()

  public async execute(eventId: number, user: User) {
    const event = await this.eventsRepository.findById(eventId)
    if (!event) {
      throw new Error('Event not found')
    }

    const currentParticipants = await this.eventsRepository.countParticipants(eventId)
    if (currentParticipants >= event.capacity) {
      throw new Error('Event is full')
    }

    const hasConflict = await this.eventsRepository.hasTimeConflict(user.id, event.date)
    if (hasConflict) {
      throw new Error('Time conflict: You are already registered for another event at this time')
    }

    await this.eventsRepository.registerParticipant(user, event)

    return { message: 'Registration successful' }
  }
}
