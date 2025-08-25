'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '../../../types/card'
import CardForm from '../../../components/CardForm'

// user will arrive on this page after clicking edit on a card, edit card will pass in the card id via the params 
export default function EditCardPage() {
  const params = useParams()
  const router = useRouter()
  const [card, setCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`/api/cards/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/')
            return
          }
          throw new Error('Failed to fetch card')
        }
        const data = await response.json()
        setCard(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCard()
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading card...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Card not found</div>
      </div>
    )
  }

  return (
    <div>
      <CardForm card={card} mode="edit" />
    </div>
  )
}
