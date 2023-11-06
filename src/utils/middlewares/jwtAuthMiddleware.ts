import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser, IUserModel } from '../types/user/user.types'
import UserModel from '../../models/user.model'
import { ObjectId } from 'mongoose'

type TUserJwt = {
  fullname: string
  email: string
  id: ObjectId
  iat: number
}

const User: IUserModel = new UserModel()
const SECRET = `${process.env.JWT_SECRET}`
export const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = req.headers.authorization!
  if (!token || !token.includes('Bearer '))
    return res.status(400).json({ message: 'must provide a token' })
  token = token.substring(7)
  const user: JwtPayload | TUserJwt | any = jwt.verify(token, SECRET) //todo temporal any
  const findUser: IUser = await User.getUser(user.id)
  if (!findUser) return res.status(404).json({ message: 'user not found' })
  next()
}
