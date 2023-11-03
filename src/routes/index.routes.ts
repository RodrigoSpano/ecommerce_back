import { Router } from 'express'
import { userRoutes, authRoutes } from './sub-routes'

const router = Router()

router.use('/user', userRoutes)
router.use('/auth', authRoutes)

export default router
