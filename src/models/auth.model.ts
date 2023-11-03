import { IAuthModel, TSigninResponse } from '../utils/types/auth/auth.types'
import { IUser, IUserModel, IUserSchema } from '../utils/types/user/user.types'
import UserModel from './user.model'

export default class AuthModel implements IAuthModel {
  private UserModel: IUserModel = new UserModel()

  async signup(data: Omit<IUser, '_id'>): Promise<IUser> {
    const user: IUser = await this.UserModel.createUser(data)
    if (!user) throw new Error('Error creating user!')
    return user
  }

  async signin(
    data: Omit<IUser, '_id' | 'fullname'>
  ): Promise<TSigninResponse> {
    const findUser: IUserSchema = await this.UserModel.getUserByEmail(
      data.email
    )
    if (!findUser) throw Error('user not found')
    const isMatch: boolean = findUser.comparePassword!(data.password)
    if (!isMatch) throw new Error('Invalid credentials')
    const token: string = findUser.createToken!()
    if (!token) throw new Error('Error creating jwt token')
    return {
      user: findUser,
      token
    }
  }
}
