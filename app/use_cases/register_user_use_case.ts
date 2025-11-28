import User from '#models/user'
import UsersRepository from '../repositories/users_repository.js'

export default class RegisterUserUseCase {
  private usersRepository = new UsersRepository()

  public async execute(data: any): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error('User already exists')
    }

    return await this.usersRepository.create(data)
  }
}
