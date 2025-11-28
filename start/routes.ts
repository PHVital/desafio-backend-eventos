import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RegistrationsController = () => import('#controllers/registrations_controller')
const AuthController = () => import('#controllers/auth_controller')
const EventsController = () => import('#controllers/events_controller')

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.get('/events', [EventsController, 'index'])
    router.post('/events', [EventsController, 'store'])
    router.post('/events/:id/register', [RegistrationsController, 'store'])
    router.get('/events/:id', [EventsController, 'show'])
    router.get('/me/events', [AuthController, 'myEvents'])
    router.put('/events/:id', [EventsController, 'update'])
    router.delete('/events/:id', [EventsController, 'destroy'])
  })
  .use(middleware.auth())
