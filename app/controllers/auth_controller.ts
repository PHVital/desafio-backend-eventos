import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import RegisterUserUseCase from '../use_cases/register_user_use_case.js'
import LoginUseCase from '../use_cases/login_use_case.js'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    try {
      const useCase = new RegisterUserUseCase()
      const user = await useCase.execute(data)

      return response.created(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginValidator)

    try {
      const useCase = new LoginUseCase()
      const result = await useCase.execute(data)

      return response.ok(result)
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async myEvents({ response, auth }: HttpContext) {
    const user = auth.user!

    await user.load('events', (query) => {
      query.preload('organizer')
    })

    return response.ok(user.events)
  }
}
