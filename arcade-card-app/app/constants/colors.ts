export const CARD_COLORS = [
    { name: 'Red', value: '#FF6B6B', className: 'bg-card-red' },
    { name: 'Orange', value: '#FFA94D', className: 'bg-card-orange' },
    { name: 'Yellow', value: '#FFD43B', className: 'bg-card-yellow' },
    { name: 'Green', value: '#69DB7C', className: 'bg-card-green' },
    { name: 'Teal', value: '#38D9A9', className: 'bg-card-teal' },
    { name: 'Cyan', value: '#4DABF7', className: 'bg-card-cyan' },
    { name: 'Blue', value: '#748FFC', className: 'bg-card-blue' },
    { name: 'Indigo', value: '#9775FA', className: 'bg-card-indigo' },
    { name: 'Pink', value: '#F783AC', className: 'bg-card-pink' },
    { name: 'Gray', value: '#CED4DA', className: 'bg-card-gray' },
  ] as const
  
  export type CardColor = typeof CARD_COLORS[number]['value']
  