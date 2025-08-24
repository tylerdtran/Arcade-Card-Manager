export interface Card {
    id: string
    title: string
    description?: string
    fillColor: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CreateCardData {
    title: string
    description?: string
    fillColor: string
  }
  
  export interface UpdateCardData {
    title?: string
    description?: string
    fillColor?: string
  }
  
  export type SortField = 'title' | 'description'
  export type SortOrder = 'asc' | 'desc'
  
  export interface CardFilters {
    fillColor?: string
    sortBy?: SortField
    sortOrder?: SortOrder
  }
  