import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task, { Status } from 'App/Models/Task'
import TaskShare from 'App/Models/TaskShare';
import User from 'App/Models/User';

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

  public async update({request, response, params}: HttpContextContract) {
    const taskId = params.id;
    const user = request["user"];
    const { title, description, due_data, status } = request.only(['title', 'description', 'due_data', 'status']);

    const task = await Task.query().where('id', taskId).where('user_id', user.id).first();
    if(!task) return response.status(404).json({ message: 'Task not found' });

    if(title){
      const taskTitleExists = await Task.query().where('user_id', user.id).whereRaw('LOWER(title) = ?', [title.toLowerCase()]).first();
      if(taskTitleExists) return response.status(400).json({ message: 'Task already exists', taskTitleExists });
      task.title = title;
    }

    if(description) task.description = description;
    if(due_data) task.due_data = due_data;
    if(status) task.status = status;

    await task.save();

    return response.status(200).json({ message: 'Task updated successfully' });
  }

  public async destroy({request, response, params}: HttpContextContract) {
    const taskId = params.id;
    const user = request["user"];

    const task = await Task.query().where('id', taskId).where('user_id', user.id).first();
    if(!task) return response.status(404).json({ message: 'Task not found' });

    await task.delete();

    return response.status(200).json({ message: 'Task deleted successfully' });
  }

  public async getTaskInfo({request, response, params}: HttpContextContract) {
    const taskId = params.id;
    const user = request["user"];

    const task = await Task.query().where('id', taskId).where('user_id', user.id).first();
    if(!task) return response.status(404).json({ message: 'Task not found' });

    return response.status(200).json({ task });
  }

  public async share({request, response, params}: HttpContextContract) {
    const taskId = params.id;
    const { to_user, permission } = request.only(['to_user', 'permission']);
    if(!to_user || !permission) return response.status(400).json({ message: 'Missing required fields' });

    const toUserDB = await User.query().where('id', to_user).first();
    if(!toUserDB) return response.status(404).json({ message: 'User not found' });

    const taskDBExists = await Task.query().where('id', taskId).first();
    if(!taskDBExists) return response.status(404).json({ message: 'Task not found' });

    const taskShareDb = await TaskShare.query().where('task_id', taskId).where('user_id', to_user).first();
    if(taskShareDb) return response.status(400).json({ message: 'Task already shared' });

    await TaskShare.create({
      task_id: taskId,
      user_id: to_user,
      permission
    });

    return response.status(200).json({ message: 'Task shared successfully' });
  }
}
