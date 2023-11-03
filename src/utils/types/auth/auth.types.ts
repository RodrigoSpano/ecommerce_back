import { Response } from 'express'
import { IUser } from '../user/user.types'

export type TSigninResponse = {
  user: IUser
  token: string
}

export interface IAuthModel {
  signup(data: Omit<IUser, '_id'>): Promise<IUser>
  signin(data: Omit<IUser, '_id' | 'fullname'>): Promise<TSigninResponse>
}

export type TAuthRequestSingup = {
  body: Omit<IUser, '_id'>
}
export type TAuthRequestSingin = {
  body: Omit<IUser, '_id' | 'fullname'>
}

export interface IAuthControllers {
  signup(req: TAuthRequestSingup, res: Response): void
  signin(req: TAuthRequestSingin, res: Response): void
}
