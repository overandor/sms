import { NextResponse } from 'next/server'
import { viewItem } from '@/lib/membra/store'

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> }
) {
  const params = await context.params

  const item = viewItem(params.code)

  if (!item) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json(item)
}
