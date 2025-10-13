import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class Auth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    console.log("Hello Wolrd!");

    const authHeader = request.header('Authorization')
    if(!authHeader) return response.status(401).json({ message: 'Authorization header is required' });

    const token = authHeader.replace('Bearer ', '')

    try{
      const secret = Env.get('SECRET', 'null')
      const decoded: any = jwt.verify(token, secret)
      const user = await User.find(decoded.id)
      if(!user) return response.status(401).json({ message: 'Invalid user' });

      request["user"] = user;
      await next();
    }catch(e){
      return response.unauthorized({ message: 'Token invalid or expired', e: e.message })
    }
  }
}
