import { Response, Router } from 'express'
import AuthController from '../../controllers/auth.controller'
import {
  IAuthControllers,
  TAuthRequestSingin,
  TAuthRequestSingup
} from '../../utils/types/auth/auth.types'

const router = Router()
const controllers: IAuthControllers = new AuthController()

router.post('/signup', (req: TAuthRequestSingup, res: Response) =>
  controllers.signup(req, res)
)

router.post('/signin', (req: TAuthRequestSingin, res: Response) =>
  controllers.signin(req, res)
)

export default router
