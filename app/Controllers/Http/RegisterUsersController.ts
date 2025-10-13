import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class RegisterUsersController {
  public async store({request, response}: HttpContextContract) {
    const payload = request.body()

    const userDB = await User.query().where('email', payload.email).first();
    if(userDB) return response.status(400).json({ message: 'User already exists' });

    const user = await User.create(payload);
    return response.status(201).json(user)
  }
}
