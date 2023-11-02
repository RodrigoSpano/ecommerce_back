import { Response } from 'express'
import UserModel from '../models/user.model'
import {
  IUser,
  IUserController,
  IUserModel,
  IUserRequests,
  TDeleteResponse
} from '../utils/types/user/user.types'

export default class UserController implements IUserController {
  private UserModel: IUserModel = new UserModel()

  async getUser(req: IUserRequests, res: Response) {
    try {
      const user: IUser = await this.UserModel.getUser(req.params.id)
      return res.status(200).json({ user })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async deleteUser(req: IUserRequests, res: Response) {
    try {
      const { deletedCount }: TDeleteResponse = await this.UserModel.deleteUser(
        req.params.id
      )
      if (deletedCount > 0)
        return res.status(400).json({ message: 'error deleting user' })
      return res.status(200).json({ success: true, id: req.params.id })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
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
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async recoveryPassword(req: IUserRequests, res: Response) {
    try {
      await this.UserModel.recoveryPassword(req.params.id, req.body.newPassword)
      return res
        .status(200)
        .json({ message: 'password updated successfully!', success: true })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
