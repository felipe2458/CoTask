import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import RevokedToken from 'App/Models/RevokedToken';
import User from 'App/Models/User';

export default class Auth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    const token = request.header('Authorization')?.replace('Bearer ', '');
    if(!token) return response.status(401).json({ message: 'Token is required' });

    const isRevoked = await RevokedToken.query().where('token', token).first();
    if(isRevoked) return response.status(401).json({ message: 'Token is revoked' });

    try{
      const SECRET = Env.get('SECRET', '24h');
      const decoded: any = jwt.verify(token, SECRET);
      const user = await User.find(decoded.id);
      if(!user) return response.status(401).json({ message: 'User not found' });

      request["user"] = user;

      await next();
    }catch(e){
      return response.status(401).json({ message: 'Token is invalid', erro: e.message });
    }
  }
}
