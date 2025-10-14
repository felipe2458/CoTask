import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RevokedToken from 'App/Models/RevokedToken';
import Task from 'App/Models/Task';
import User from 'App/Models/User';

export default class UsersController {
  public async store({request, response}: HttpContextContract) {
    const payload = request.body()

    const userDB = await User.query().where('email', payload.email).first();
    if(userDB) return response.status(400).json({ message: 'User already exists' });

    const user = await User.create(payload);
    return response.status(201).json(user)
  }

  public async destroy({request, response, params}: HttpContextContract) {
    const userAuth = request["user"];
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if(!userAuth) return response.status(401).json({ message: 'Unauthorized' });

    const user = await User.find(params.id);
    if(!user) return response.status(404).json({ message: 'User not found' });

    if(userAuth.id !== user.id) return response.status(401).json({ message: 'Unauthorized' });

    const tasksUser = await Task.query().where('user_id', user.id);

    tasksUser.forEach(async (task) => {
      await task.delete();
    });

    if(token) await RevokedToken.create({ token });

    await user.delete();

    return response.status(200).json({ message: 'User deleted successfully' });
  }
}
