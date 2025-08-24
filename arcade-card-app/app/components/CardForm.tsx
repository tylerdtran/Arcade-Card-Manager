'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CreateCardData, UpdateCardData } from '../types/card'
import { CARD_COLORS } from '../constants/colors'

interface CardFormProps {
    card?: Card
    mode: 'create' | 'edit'
}

export default function CardForm({ card, mode} : CardFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<CreateCardData | UpdateCardData>({
        title: card?.title || '',
        description: card?.description || '',
        fillColor: card?.fillColor || CARD_COLORS[0].value
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (card && mode === 'edit') {
            setFormData({
                title: card.title,
                description: card.description,
                fillColor: card.fillColor
            })
        }
    }, [card, mode])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const url = mode === 'create' ? '/api/cards' : `/api/cards/${card?.id}`
            const method = mode === 'create' ? 'POST' : 'PUT'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error('Failed to save card')
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Card' : 'Edit Card'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="fillColor" className="block text-sm font-medium text-gray-700">Color</label>
                    <select
                        id="fillColor"
                        name="fillColor"
                        value={formData.fillColor}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        {CARD_COLORS.map((color: { value: string; name: string }) => (
                            <option key={color.value} value={color.value}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                    {loading ? 'Saving...' : 'Save Card'}
                </button>
            </form>
        </div>
    )
}