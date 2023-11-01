import mongoose from 'mongoose'

export interface ISeller {
  _id?: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.UUID
  sold: number
  calification: 1 | 2 | 3 | 4 | 5
}
