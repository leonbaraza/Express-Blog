# Markdown Blog Using Node.js, Express, And MongoDB
A complete Blog developed using Node.js, MongoDB, and Express by building out a complete blog with markdown support.

## Concepts Covered:

- How to create an Express server
- Connecting MongoDB with Express
- The structure of a full stack application
- How to setup database hooks

## API Routes
Definition

1. Gets all records from the database
GET /api/articles/

2. Get a single article using
- Slug
GET /api/articles/:slug
- id
GET /api/articles/:id

3. Delete an article
DELETE /api/articles/:id

4. Create a new Article
POST /api/articles/

5. Update an existing article by id
PUT /api/articles/:id