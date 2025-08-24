# Arcade Card Manager

A full-stack card management application built with Next.js, Prisma, PostgreSQL, TypeScript, and Tailwind CSS.

## Features

- **CRUD Operations**: Create, read, update, and delete cards
- **Sorting**: Sort cards by title or description (A-Z and Z-A)
- **Filtering**: Filter cards by fill color
- **Color Palette**: 10 predefined colors for card backgrounds
- **Responsive Design**: Clean, modern UI that works on all devices
- **Type Safety**: Fully typed with TypeScript
- **Database Persistence**: Cards persist across page reloads

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Ready for Vercel deployment

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd arcade-card-manager
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Copy `.env.example` to `.env` and update the database URL:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/card_manager"
```

### 3. Database Migration

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (if using migrations)
npm run db:migrate
```

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

- `GET /api/cards` - Fetch all cards (supports filtering and sorting)
- `POST /api/cards` - Create a new card
- `GET /api/cards/:id` - Fetch a specific card
- `PUT /api/cards/:id` - Update a card
- `DELETE /api/cards/:id` - Delete a card

## Color Palette

The application uses a predefined color palette:
- Red (#FF6B6B)
- Orange (#FFA94D)
- Yellow (#FFD43B)
- Green (#69DB7C)
- Teal (#38D9A9)
- Cyan (#4DABF7)
- Blue (#748FFC)
- Indigo (#9775FA)
- Pink (#F783AC)
- Gray (#CED4DA)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── cards/             # Card-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── CardForm.tsx       # Card creation/editing form
│   ├── CardItem.tsx       # Individual card display
│   └── CardList.tsx       # Card list with controls
├── constants/             # Application constants
│   └── colors.ts          # Color palette definitions
├── lib/                   # Utility libraries
│   └── prisma.ts          # Prisma client configuration
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
├── types/                 # TypeScript type definitions
│   └── card.ts            # Card-related types
└── package.json           # Dependencies and scripts
```

## Design Decisions

### Architecture
- **Next.js App Router**: Modern file-based routing with server components
- **API Routes**: RESTful API endpoints for CRUD operations
- **Prisma ORM**: Type-safe database operations with auto-generated client
- **TypeScript**: Full type safety across the application

### Performance Considerations
- **Server-side filtering and sorting**: Reduces client-side processing
- **Optimistic updates**: Immediate UI feedback for better UX
- **Efficient queries**: Prisma optimizes database queries automatically

### User Experience
- **Confirmation dialogs**: Prevent accidental deletions
- **Loading states**: Clear feedback during async operations
- **Error handling**: Graceful error messages and fallbacks
- **Responsive design**: Works seamlessly on all device sizes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Deployment

This application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the `DATABASE_URL` environment variable
3. Deploy automatically on push to main branch

The application will work with any PostgreSQL provider (Supabase, Railway, etc.). 
