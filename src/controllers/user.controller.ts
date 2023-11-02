import { Response } from 'express'
import UserModel from '../models/user.model'
import {
  IUser,
  IUserController,
  IUserModel,
  IUserRequests
} from '../utils/types/user/user.types'

export default class UserController implements IUserController {
  private UserModel: IUserModel = new UserModel()

  async getUser(req: IUserRequests, res: Response) {
    try {
      const user: IUser = await this.UserModel.getUser(req.params.id)
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async deleteUser(req: IUserRequests, res: Response) {
    try {
      const data = await this.UserModel.deleteUser(req.params.id)
      if (!data.success)
        return res.status(400).json({ message: 'error deleting user' })
      return res
        .status(200)
        .json({ message: 'user deleted successfully!', sucess: true })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async changePassword(
    req: IUserRequests,
    res: Response<any, Record<string, any>>
  ) {
    try {
      const updatedUser: IUser = await this.UserModel.changePassword(
        req.params.id,
        req.body.actualPassword,
        req.body.newPassword
      )
      return res.status(202).json({
        message: 'User password updated successfully!',
        success: true,
        user: updatedUser
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async recoveryPassword(req: IUserRequests, res: Response) {
    try {
      await this.UserModel.recoveryPassword(req.params.id, req.body.newPassword)
      return res
        .status(200)
        .json({ message: 'password updated successfully!', success: true })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
