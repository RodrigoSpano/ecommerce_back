import mongoose from 'mongoose'

export interface IProducts {
  id?: mongoose.Schema.Types.ObjectId
  title: string
  price: number
  qualification: number
  sold: number
  stock: number
  description: string
  images: string[]
  seller_id: mongoose.Schema.Types.UUID
  categories: number[]
}
