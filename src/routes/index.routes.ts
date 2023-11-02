import { Router } from 'express'
import { userRoutes } from './sub-routes'

const router = Router()

router.use('/user', userRoutes)

export default router
