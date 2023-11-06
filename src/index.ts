import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session'

import indexRouter from './routes/index.routes'
import passport from 'passport'

const app = express()

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1', indexRouter)
app.use(passport.initialize())
app.use(passport.session())
export default app
