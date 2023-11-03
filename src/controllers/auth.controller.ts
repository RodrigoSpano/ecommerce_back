import { Response } from 'express'
import AuthModel from '../models/auth.model'
import {
  IAuthControllers,
  IAuthModel,
  TAuthRequestSingin,
  TAuthRequestSingup,
  TSigninResponse
} from '../utils/types/auth/auth.types'

export default class AuthController implements IAuthControllers {
  private Model: IAuthModel = new AuthModel()

  async signup(req: TAuthRequestSingup, res: Response) {
    //todo add middleware
    try {
      await this.Model.signup(req.body)
      return res.status(201).json({ message: 'user created successfully' })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async signin(req: TAuthRequestSingin, res: Response) {
    try {
      const signinData: TSigninResponse = await this.Model.signin(req.body)
      return res.status(202).json(signinData)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
