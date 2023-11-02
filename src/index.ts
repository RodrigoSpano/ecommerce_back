import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import indexRouter from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1', indexRouter)

export default app
