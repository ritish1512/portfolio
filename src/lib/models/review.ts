import mongoose from 'mongoose'

export interface IReview extends mongoose.Document {
  name: string
  email: string
  rating: number
  review: string
  createdAt: Date
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Please provide a review'],
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [500, 'Review cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
)

export const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema)
