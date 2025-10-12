import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({request, response}: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    if(!email || !password) return response.status(400).json({ message: 'Email and password are required' });

    const user = await User.query().where('email', email).first()
    if(!user) return response.status(401).json({ message: 'Invalid email or password' });

    const passValid = await Hash.verify(user.password, password)
    if(!passValid) return response.status(401).json({ message: 'Invalid email or password' });

    const SECRET = Env.get('SECRET', '24h');

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });

    return {
      user,
      token
    }
  }
}
