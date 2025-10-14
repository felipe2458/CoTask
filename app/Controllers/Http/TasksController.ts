import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task, { Status } from 'App/Models/Task'

export default class TasksController {
  public async store({request, response}: HttpContextContract) {
    const { title, description, due_data } = request.only(['title', 'description', 'due_data']);
    if(!title || !description || !due_data) return response.status(400).json({ message: 'Missing required fields' });

    const taskDB = await Task.query().where('user_id', request["user"].id).whereRaw('LOWER(title) = ?', [title.toLowerCase()]).first();
    if(taskDB) return response.status(400).json({ message: 'Task already exists', taskDB });

    const task = await Task.create({
      title,
      description,
      due_data,
      status: Status.PENDENTE,
      user_id: request["user"].id
   });

    return response.status(201).json(task)
  }

  public async index({request, response}: HttpContextContract) {
    const tasks = await Task.query().where('user_id', request["user"].id).orderBy('created_at', 'desc');

    return response.status(200).json({ tasks });
  }

  public async getTaskInfo({request, response, params}: HttpContextContract) {
    const taskId = params.id;
    const user = request["user"];

    const task = await Task.query().where('id', taskId).where('user_id', user.id).first();
    if(!task) return response.status(404).json({ message: 'Task not found' });

    return response.status(200).json({ task });
  }
}
