'use client'

import { useState, useEffect } from 'react'
import { Card, SortField, SortOrder } from '../types/card'
import { CARD_COLORS } from '../constants/colors'
import CardItem from './CardItem'

interface CardListProps {
  onAddCard: () => void
}

export default function CardList({ onAddCard }: CardListProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<SortField>('title')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
    const [filterColor, setFilterColor] = useState<string>('')

    const fetchCards = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (filterColor) params.append('fillColor', filterColor)
            if (sortBy) params.append('sortBy', sortBy)
            if (sortOrder) params.append('sortOrder', sortOrder)

            const response = await fetch(`/api/cards?${params}`)
            if (!response.ok) throw new Error('Failed to fetch cards')

            const data = await response.json()
            setCards(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCard = async (id: string) => {
        try {
            const response = await fetch(`/api/cards/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error('Failed to delete card')
            setCards(cards.filter(card => card.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    useEffect(() => {
        fetchCards()
    }, [filterColor, sortBy, sortOrder])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>


    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                {/* Sort Controls */}
                <div className="flex gap-2 items-center">
                    <label className="text-sm font-medium">Sort by:</label>
                    <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortField)}
                    className="border rounded px-2 py-1 text-sm"
                    >
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                    </select>
                    <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-50"
                    >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="flex gap-2 items-center">
                    <label className="text-sm font-medium">Filter by color:</label>
                    <select
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                    >
                    <option value="">All colors</option>
                    {CARD_COLORS.map((color: { value: string; name: string }) => (
                        <option key={color.value} value={color.value}>
                        {color.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>

                {/* Add Card Button */}
                <button
                onClick={onAddCard}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                Add New Card
                </button>
            </div>

            {/* Cards Grid */}
            {cards.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                No cards found. Create your first card!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <CardItem
                    key={card.id}
                    card={card}
                    onDelete={handleDeleteCard}
                    />
                ))}
                </div>
            )}
        </div>
  )
}