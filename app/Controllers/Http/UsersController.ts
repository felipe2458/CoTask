import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({request, response}: HttpContextContract) {
    const payload = request.body()
    const user = await User.create(payload);
    return response.status(201).json(user)
  }
}
