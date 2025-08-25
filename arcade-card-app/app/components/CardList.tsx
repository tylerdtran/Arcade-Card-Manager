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

    // fetch cards from the API
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

    // delete card from the API
    const handleDeleteCard = async (id: string) => {
        // Show confirmation dialog before deleting: the prompt 
        if (!confirm('Are you sure you want to delete this card?')) {
            return
        }
        
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

    // fetch cards when the component mounts
    useEffect(() => {
        fetchCards()
    }, [filterColor, sortBy, sortOrder])

    // if loading, show a loading message
    if (loading) return <div>Loading...</div>

    // if there is an error, show an error message
    if (error) return <div>Error: {error}</div>

    return (
        <div className="space-y-6 m-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between m-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Sort Controls */}
                    <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortField)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="title">Title</option>
                            <option value="description">Description</option>
                        </select>
                    </div>
                    
                    {/* Sort Order Controls */}
                    <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium">Order:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="asc">Ascending (A-Z)</option>
                            <option value="desc">Descending (Z-A)</option>
                        </select>
                    </div>
                    
                    {/* Filter Controls */}
                    <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium">Filter by color:</label>
                        <select
                            value={filterColor}
                            onChange={(e) => setFilterColor(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <button
                    onClick={onAddCard}
                    className="px-4 py-2 bg-blue-400 text-black rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                >
                    Add New Card
                </button>
            </div>

            {/* Cards Grid */}
            {cards.length === 0 ? (
                <div className="text-center py-12 text-black">
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