import { connectDB } from '@/lib/db'
import { Review } from '@/lib/models/review'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()

    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(50)

    return NextResponse.json({ success: true, data: reviews }, { status: 200 })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, rating, review } = body

    if (!name || !email || !rating || !review) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    const newReview = await Review.create({
      name,
      email,
      rating: parseInt(rating),
      review,
    })

    return NextResponse.json({ success: true, data: newReview }, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating review:', error)
    const message = error instanceof Error ? error.message : 'Failed to create review'
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}
