import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().optional(),
    date: vine.date({ formats: ['YYYY-MM-DD HH:mm:ss'] }).after('today'),
    location: vine.string(),
    capacity: vine.number().min(1),
  })
)
