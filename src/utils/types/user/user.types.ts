import mongoose from 'mongoose'

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
  getUser(id: mongoose.Schema.Types.ObjectId): Promise<IUser>
  createUser(data: Omit<IUser, 'id'>): Promise<IUser>
  deleteUser(id: mongoose.Schema.Types.ObjectId): Promise<{ success: boolean }>
  changePassword(
    id: mongoose.Schema.Types.ObjectId,
    actualPassword: string,
    newPassword: string
  ): Promise<IUser>
  recoveryPassword(
    id: mongoose.Schema.Types.ObjectId,
    newPassword: string
  ): Promise<void>
}
