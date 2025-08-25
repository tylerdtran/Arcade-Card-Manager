'use client'

import { Card } from '../types/card'
import { useRouter } from 'next/navigation'

interface CardItemProps {
    card: Card
    onDelete: (id: string) => void // passed on from CardList
}

export default function CardItem({ card, onDelete }: CardItemProps) {
    const router = useRouter()

    // call the edit endpoint for that specific card
    const handleEdit = () => {
        router.push(`/cards/${card.id}/edit`)
    }

    return (
    <div 
        className="rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow m-4 min-h-36 flex flex-col justify-between"
        style={{ backgroundColor: card.fillColor }}
        >
      <div>
            <h3 className="font-semibold text-lg text-black">{card.title}</h3>
            {card.description && (
                <p className="text-black/80 mt-1">{card.description}</p>
            )}
      </div>

      {/* align the buttons to the bottom right */}
      <div className="flex items-center justify-end mt-4">
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-blue-400 hover:bg-blue-600 text-black rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-700 text-black rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    )
}