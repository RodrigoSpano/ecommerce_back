import { Error, HydratedDocument, Schema } from 'mongoose'
import { User } from '../db/models'
import {
  IUser,
  IUserModel,
  IUserSchema,
  TDeleteResponse
} from '../utils/types/user/user.types'
import bcrypt from 'bcrypt'

export default class UserModel implements IUserModel {
  private Model = User

  async getUser(id: Schema.Types.ObjectId): Promise<HydratedDocument<IUser>> {
    const user: HydratedDocument<IUser> | null = await this.Model.findById(id)
    if (!user) throw new Error('user not found')
    return user
  }

  async getUserByEmail(email: string): Promise<HydratedDocument<IUser>> {
    const user: HydratedDocument<IUser> | null = await this.Model.findOne({
      email
    })
    if (!user) throw new Error('user not found')
    return user
  }

  async createUser(data: Omit<IUser, '_id'>): Promise<IUser> {
    try {
      const user: HydratedDocument<IUser> = new this.Model(data)
      await user.save()
      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async deleteUser(id: Schema.Types.ObjectId): Promise<TDeleteResponse> {
    try {
      return await this.Model.deleteOne({ _id: id })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async changePassword(
    id: Schema.Types.ObjectId,
    actualPassword: string,
    newPassword: string
  ): Promise<IUser> {
    const findUser = await this.Model.findById(id)
    if (!findUser) throw new Error('user not found')
    if (!findUser.comparePassword!(actualPassword))
      throw new Error('password doesnt match')
    const hashNewPass = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
    const updateUser = await this.Model.findOneAndUpdate(
      { _id: id },
      { password: hashNewPass },
      { new: true }
    )
    return await updateUser!.save()
  }

  async recoveryPassword(
    id: Schema.Types.ObjectId,
    newPassword: string
  ): Promise<void> {
    const user: HydratedDocument<IUserSchema> | null =
      await this.Model.findById(id)
    if (!user) throw new Error('user not found')
    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
    await user.updateOne({ password: hashedPassword }, { new: true })
    await user.save()
  }
}
