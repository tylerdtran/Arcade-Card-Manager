'use client'

import { Card } from '../types/card'
import { CARD_COLORS } from '../constants/colors'
import { useRouter } from 'next/navigation'

interface CardItemProps {
    card: Card
    onDelete: (id: string) => void // passed on from CardList
}

export default function CardItem({ card, onDelete }: CardItemProps) {

    const router = useRouter()
    const colorInfo = CARD_COLORS.find((color: { value: string }) => color.value === card.fillColor)

    const handleEdit = () => {
        router.push(`/cards/${card.id}/edit`)
    }

    return (
        <div 
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      style={{ backgroundColor: card.fillColor }}
    >
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-black">{card.title}</h3>
          {card.description && (
            <p className="text-black/80 mt-1">{card.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: card.fillColor }}
            />
            <span className="text-sm text-black/70">
              {colorInfo?.name || 'Unknown'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 text-black rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-700 rounded transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}