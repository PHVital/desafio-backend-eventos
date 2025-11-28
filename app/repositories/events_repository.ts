import db from '@adonisjs/lucid/services/db'
import Event from '#models/event'
import User from '#models/user'

export default class EventsRepository {
  public async create(data: any): Promise<Event> {
    return await Event.create(data)
  }

  public async findById(id: number): Promise<Event | null> {
    return await Event.find(id)
  }

  public async countParticipants(eventId: number): Promise<number> {
    const result = await db.from('registrations').where('event_id', eventId).count('* as total')

    return result[0].total
  }

  public async hasTimeConflict(userId: number, eventDate: any): Promise<boolean> {
    const user = await User.find(userId)
    if (!user) return false

    const conflict = await user.related('events').query().where('date', eventDate.toSQL()).first()

    return !!conflict
  }

  public async registerParticipant(user: User, event: Event): Promise<void> {
    await user.related('events').attach([event.id])
  }
}
