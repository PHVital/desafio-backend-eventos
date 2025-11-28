import User from '#models/user'

export default class UsersRepository {
  public async create(data: Partial<User>): Promise<User> {
    return await User.create(data)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }
}
