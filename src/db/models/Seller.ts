import mongoose from 'mongoose'
import { ISeller } from '../../utils/types/seller/seller.types'

const SellerSchema = new mongoose.Schema<ISeller>(
  {
    userId: {
      type: mongoose.Schema.Types.UUID,
      required: true
    },
    calification: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      required: true
    }
  },
  { timestamps: false }
)

export default mongoose.model<ISeller>('seller', SellerSchema)
