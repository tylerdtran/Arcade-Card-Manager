-----------------
```
directory structure 
/app 
/app/cards
 - route.ts # this handles the GET and POST routes /api/cards
/app/cards/[id]
 - route.ts # this handles the PUT and DELETE routes /api/cards/:id
```


Prisma Installation: 
npm install prisma --save-dev
npm install @prisma/client

npx prisma init

npx prisma migrate dev --name init

postgres@14

