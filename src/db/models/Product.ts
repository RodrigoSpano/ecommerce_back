import mongoose from 'mongoose'
import { IProducts } from '../../utils/types/products/products.types'

const ProductSchema = new mongoose.Schema<IProducts>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: [Number],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  qualification: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    required: true
  },
  seller_id: {
    type: mongoose.Schema.Types.UUID,
    required: true
  }
})

export default mongoose.model<IProducts>('product', ProductSchema)
