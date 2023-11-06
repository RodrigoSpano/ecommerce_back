import { Router } from 'express'
import { userRoutes, authRoutes } from './sub-routes'
import { jwtAuthMiddleware } from '../utils/middlewares/jwtAuthMiddleware'

const router = Router()

router.use('/user', jwtAuthMiddleware, userRoutes)
router.use('/auth', authRoutes)

export default router
