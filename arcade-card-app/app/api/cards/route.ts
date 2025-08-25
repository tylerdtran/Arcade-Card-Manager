// GET and POST routes for cards sorting also will happen through the api route and not the client side 

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import { CreateCardData, UpdateCardData } from '../../types/card'

// GET /api/cards
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // sorting and filtering implemented through API endpoints
        const fillColor = searchParams.get('fillColor')
        const sortBy = searchParams.get('sortBy') as 'title' | 'description' | null
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null

        const where = fillColor ? { fillColor } : {}
        const orderBy = sortBy ? { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' } : {}

        const cards = await prisma.card.findMany({
            where,
            orderBy
        })

        return NextResponse.json(cards, { status: 200 })
    } catch (error) {
        console.error('Error fetching cards:', error)
        return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 })
    }
}

// POST /api/cards
export async function POST(request: NextRequest) {
    try {
        const body: CreateCardData = await request.json()
        if (!body.title || !body.fillColor) {
            return NextResponse.json({ error: 'Title and fill color are required' }, { status: 400 })
        }
        // payload 
        const card = await prisma.card.create({
            data: {
                title: body.title,
                description: body.description,
                fillColor: body.fillColor
            }
        })

        if (!card) {
            return NextResponse.json({ error: 'Failed to create card' }, { status: 400 })
        }

        return NextResponse.json(card, { status: 201 })
    } catch (error) {
        console.error('Error creating card:', error)
        return NextResponse.json({ error: 'Failed to create card' }, { status: 500 })
    }
}
