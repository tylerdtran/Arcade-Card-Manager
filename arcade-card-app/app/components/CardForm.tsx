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
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

    useEffect(() => {
        if (card && mode === 'edit') {
            setFormData({
                title: card.title,
                description: card.description || '',
                fillColor: card.fillColor
            })
        }
    }, [card, mode])

    const validateForm = () => {
        const errors: {[key: string]: string} = {}
        
        // Validate title
        if (!formData.title || !formData.title.trim()) {
            errors.title = 'Title is required'
        } else if (formData.title.trim().length < 1) {
            errors.title = 'Title must be at least 1 character long'
        }
        
        // Validate fill color
        if (!formData.fillColor) {
            errors.fillColor = 'Please select a color'
        }
        
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Validate form before submitting
        if (!validateForm()) {
            return
        }
        
        setLoading(true)
        setError(null)

        try {
            // if the mode is create, create a new card, if the mode is edit, update the card
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
            <h2 className="text-2xl font-bold mb-4 text-center">{mode === 'create' ? 'Create Card' : 'Edit Card'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            validationErrors.title ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter card title"
                    />
                    {validationErrors.title && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter card description (optional)"
                        rows={3}
                    />
                </div>
                <div>
                    <label htmlFor="fillColor" className="block text-sm font-medium">
                        Color <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="fillColor"
                        name="fillColor"
                        value={formData.fillColor}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            validationErrors.fillColor ? 'border-red-500' : ''
                        }`}
                    >
                        <option value="">Select a color</option>
                        {CARD_COLORS.map((color: { value: string; name: string }) => (
                            <option key={color.value} value={color.value}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                    {validationErrors.fillColor && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.fillColor}</p>
                    )}
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-400 text-black p-2 rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : 'Save Card'}
                </button>
            </form>
        </div>
    )
}