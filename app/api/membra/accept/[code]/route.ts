import { NextResponse } from 'next/server'
import { acceptItem } from '@/lib/membra/store'

export async function POST(
  request: Request,
  context: { params: Promise<{ code: string }> }
) {
  const params = await context.params

  const result = acceptItem(params.code)

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 })
  }

  return NextResponse.json(result)
}
