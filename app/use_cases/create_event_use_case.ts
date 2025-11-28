import { DateTime } from 'luxon'
import EventsRepository from '../repositories/events_repository.js'
import User from '#models/user'

export default class CreateEventUseCase {
  private eventsRepository = new EventsRepository()

  public async execute(data: any, user: User) {
    if (user.role !== 'ORGANIZER') {
      throw new Error('Unauthorized: Only organizers can create events')
    }

    const eventData = {
      ...data,
      date: DateTime.fromJSDate(data.date),
      organizerId: user.id,
    }

    return await this.eventsRepository.create(eventData)
  }
}
