# Arcade Card Manager

I created a card management application using Next.js, Prisma ORM, PostgreSQL, TypeScript, and Tailwind CSS. The application supports CRUD operations for cards and uses reusable components (CardList, CardForm, CardItem).  

## Prerequisites

- Node.js 18+ (I used node 20 to develop)
- PostgreSQL database
- npm 

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tylerdtran/Arcade-Card-Manager
cd Arcade-Card-Manager/arcade-card-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Local PostgreSQL


1. Install PostgreSQL on your system
```bash
# if not already installed
brew install postgresql # if necessary, (these were the commands I ran to setup)
brew services start postgresql # if necessary

# once installed 
createuser -s postgres
psql -U postgres
```
2. Create a new database:
```sql
# inside the psql session
CREATE DATABASE card_manager;
```
To check that the connection
```sql
psql -U postgres -d card_manager

# inside the psql session
ALTER USER postgres PASSWORD 'yourpassword';
```
### 4. Environment Configuration

Create a `.env` file in the `/Arcade-Card-Manager/arcade-card-app` directory:

Edit `.env` with your PostgreSQL connection string:
```env
DATABASE_URL="DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/card_manager""
```

### 5. Prisma Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for development)
npx prisma db push
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Design Decisions & Performance Considerations
Filtering and Sorting are done on the backend in the respective endpoints in the `route.ts` files. The filtering and sorting being done through the endpoints when the database queries are called is more efficient than filtering and sorting on the client-side as it requires less client-side processing. Sorting is done based on the ASCII system. So capital letters will always have precedence over lowercase letters 

The Prisma ORM provides an interface to interact with the Postgres database without having to write direct SQL queries. Something that I noticed is that this integration with typescript allows for more seamless querying of the database. Kinda cool. 

Lastly, I provided error handling inside the components when the endpoints are called as well as within the endpoints themselves to provide proper error messaging for cases where the endpoint call is unsuccessful. There is also the confirmation dialog set to ensure that there are no accidental deletions per the assessment specifications.

There is also database persistance as cards do persist across page reloads and when a user edits and doesn't save the edit, the card does not reflect the changes that the user tried to make as instructed by the assessment spec. 


## API Endpoints

I currently support these 5 endpoints. I know only 4 were required but the `GET /api/cards/:id` is required to populate the input fields of the [id]/edit page. 

- `GET /api/cards` - Fetch all cards (supports filtering and sorting)
- `POST /api/cards` - Create a new card
- `GET /api/cards/:id` - Fetch a specific card
- `PUT /api/cards/:id` - Update a card
- `DELETE /api/cards/:id` - Delete a card

The first two endpoints are reflected in the `../app/api/cards/route.ts`. The last 3 endpoints are reflected in `../app/api/cards/[id]/route.ts`. They take advantage of the dynamic routing supported by next.js through the file structure to target cards with a specific `[id]`.  

## Color Palette

I used the predefined color palette with 10 colors:

| Color Name | Hex Code | Tailwind Class |
|------------|----------|----------------|
| Red        | #FF6B6B  | bg-card-red    |
| Orange     | #FFA94D  | bg-card-orange |
| Yellow     | #FFD43B  | bg-card-yellow |
| Green      | #69DB7C  | bg-card-green  |
| Teal       | #38D9A9  | bg-card-teal   |
| Cyan       | #4DABF7  | bg-card-cyan   |
| Blue       | #748FFC  | bg-card-blue   |
| Indigo     | #9775FA  | bg-card-indigo |
| Pink       | #F783AC  | bg-card-pink   |
| Gray       | #CED4DA  | bg-card-gray   |

Text should remain readable with black font on all background colors.

I put these colors into an exportable color map in `/constants/colors.ts` for easier access to these colors. 

## Project Structure

```
arcade-card-app/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   └── cards/                # Card API endpoints
│   │       ├── route.ts          # GET /api/cards, POST /api/cards
│   │       └── [id]/             # Individual card endpoints
│   │           └── route.ts      # GET, PUT, DELETE /api/cards/:id
│   ├── cards/                    # Card-related pages
│   │   ├── new/                  # Create new card
│   │   │   └── page.tsx
│   │   └── [id]/                 # Edit card
│   │       └── edit/
│   │           └── page.tsx
│   ├── components/               # React components
│   │   ├── CardForm.tsx          # Card creation/editing form
│   │   ├── CardItem.tsx          # Individual card display
│   │   └── CardList.tsx          # Card list with controls
│   ├── constants/                # Application constants
│   │   └── colors.ts             # Color palette definitions
│   ├── types/                    # TypeScript type definitions
│   │   └── card.ts               # Card-related types
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/                          # Utility libraries
│   └── prisma.ts                 # Prisma client configuration
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema
├── public/                       # Static assets
├── .env                          # Environment variables
├── .env.example                  # Example environment file
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

When it comes to the `/cards` directory, there are two specific pages the `/new` directory that routes to a URL with `/new` that creates a new card and the `[id]/edit` directory that routes to a url with `[id]/edit` that allows a user to edit the existing card `[id]`. Both page.tsx files utilize the same `<CardForm>` component but passes through a different mode prop. This allows us to modularly use the same CardForm component, reducing redundant code. 

## Database Schema

```prisma
model Card {
  id          String   @id @default(cuid())
  title       String
  description String?
  fillColor   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
I decided for the timestamps that I should have a createdAt and updatedAt DateTime field. These could be potentially useful for future sorting parameters in case we want to sort by when the card was created or when it was last updated. 

## Troubleshooting

### Common Issues

1. **Prisma Client not generated**
   ```bash
   npx prisma generate
   ```

2. **Database connection failed**
   - Check your `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

3. **Migration errors**
   ```bash
   npx prisma db push
   ```

