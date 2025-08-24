// PUT and DELETE routes for cards with [id] param

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { UpdateCardData } from '../../../types/card'

// get card by id, this is a dynamic route for when an edit page is loaded
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const card = await prisma.card.findUnique({
            where: { id }
        })

        if (!card) {
            return NextResponse.json({ error: 'Card not found' }, { status: 404 })
        }

        return NextResponse.json(card)
    } catch (error) {
        console.error('Error fetching card:', error)
        return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 })
    }
}

// update card
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const body: UpdateCardData = await request.json()

        if (!body.title && !body.description && !body.fillColor) {
            return NextResponse.json({ error: 'At least one field is required' }, { status: 400 })
        }

        const card = await prisma.card.update({
            where: { id },
            data: {
                // if body.title is not empty, update the title
                ...(body.title && { title: body.title }),
                // if body.description is not empty, update the description
                ...(body.description && { description: body.description }),
                // if body.fillColor is not empty, update the fillColor
                ...(body.fillColor && { fillColor: body.fillColor })
            }
        })

        if (!card) {
            return NextResponse.json({ error: 'Card not found' }, { status: 404 })
        }

        return NextResponse.json(card)
    } catch (error) {
        console.error('Error updating card:', error)
        return NextResponse.json({ error: 'Failed to update card' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const card = await prisma.card.delete({
            where: { id }
        })

        return NextResponse.json(card)
    } catch (error) {
        console.error('Error deleting card:', error)
        return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 })
    }
}