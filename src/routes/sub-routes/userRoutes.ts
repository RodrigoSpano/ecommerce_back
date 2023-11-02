import { Response, Router } from 'express'
import UserController from '../../controllers/user.controller'
import {
  IUserController,
  IUserRequests
} from '../../utils/types/user/user.types'

const router = Router()
const controllers: IUserController = new UserController()

router.get('/:id', (req: IUserRequests, res: Response) =>
  controllers.getUser(req, res)
)
router.delete('/delete/:id', (req: IUserRequests, res: Response) =>
  controllers.deleteUser(req, res)
)

router.patch('/password/:id', (req: IUserRequests, res: Response) =>
  controllers.changePassword(req, res)
)

router.patch('/password-recovery/:id', (req: IUserRequests, res: Response) =>
  controllers.recoveryPassword(req, res)
)

export default router
