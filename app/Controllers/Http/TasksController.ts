import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksController {
  public async store({request, response}: HttpContextContract) {
    return response.json(request["user"])
  }
}
