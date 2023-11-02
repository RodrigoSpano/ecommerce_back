import { Request, Response } from 'express'
import mongoose, { ObjectId } from 'mongoose'

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId
  fullname: string
  email: string
  password: string
}

export interface IUserSchema extends IUser {
  comparePassword?(password: string): boolean
}

export interface IUserModel {
  getUser(id: ObjectId): Promise<IUser>
  createUser(data: Omit<IUser, 'id'>): Promise<IUser>
  deleteUser(id: ObjectId): Promise<{ success: boolean }>
  changePassword(
    id: ObjectId,
    actualPassword: string,
    newPassword: string
  ): Promise<IUser>
  recoveryPassword(id: ObjectId, newPassword: string): Promise<void>
}

export interface IUserRequests {
  query: {}
  params: { id: ObjectId }
  body: { actualPassword: string; newPassword: string }
}

export interface IUserController {
  getUser(req: IUserRequests, res: Response): void
  deleteUser(req: IUserRequests, res: Response): void
  changePassword(req: IUserRequests, res: Response): void
  recoveryPassword(req: IUserRequests, res: Response): void
}
