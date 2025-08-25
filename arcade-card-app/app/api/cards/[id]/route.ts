// PUT and DELETE routes for cards with [id] param

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { UpdateCardData } from '../../../types/card'

// get card by id, this is a dynamic route for when an edit page is loaded
// GET /api/cards/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
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
// PUT /api/cards/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body: UpdateCardData = await request.json()

        if (!body.title && body.description === undefined && !body.fillColor) {
            return NextResponse.json({ error: 'At least one field is required' }, { status: 400 })
        }

        const updateData: {
            title?: string;
            description?: string | null;
            fillColor?: string;
        } = {}
        
        // Handle title update
        if (body.title !== undefined) {
            updateData.title = body.title
        }
        
        // Handle description update - allow empty string to be saved as null
        if (body.description !== undefined) {
            updateData.description = body.description || null
        }
        
        // Handle fillColor update
        if (body.fillColor !== undefined) {
            updateData.fillColor = body.fillColor
        }

        const card = await prisma.card.update({
            where: { id },
            data: updateData
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

// DELETE /api/cards/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const card = await prisma.card.delete({
            where: { id }
        })

        return NextResponse.json(card)
    } catch (error) {
        console.error('Error deleting card:', error)
        return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 })
    }
}