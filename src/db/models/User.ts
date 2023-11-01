import mongoose from 'mongoose'
import { IUserSchema } from '../../utils/types/user/user.types'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema<IUserSchema>({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  return next()
})

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model<IUserSchema>('user', UserSchema)
