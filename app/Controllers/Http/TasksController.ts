import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async store({request, response}: HttpContextContract) {
    const { title, description } = request.only(['title', 'description']);
    if(!title || !description) return response.status(400).json({ message: 'Title and description are required' });

    const taskDB = await Task.query().where('user_id', request["user"].id).whereRaw('LOWER(title) = ?', [title.toLowerCase()]).first();
    if(taskDB) return response.status(400).json({ message: 'Task already exists', taskDB });

    const task = await Task.create({ title, description, user_id: request["user"].id })

    return response.status(201).json(task)
  }

  public async index({request, response}: HttpContextContract) {
    const tasks = await Task.query().where('user_id', request["user"].id).orderBy('created_at', 'desc');

    return response.status(200).json({ tasks });
  }
}
