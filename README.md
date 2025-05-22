# RESTful API Service

This is a RESTful API service built with Node.js, Express, and MongoDB for the Firetimers assignment.

## Project Structure

```
restful-api/
├── src/
│   ├── index.js          # Main server file
│   ├── models/
│   │   └── Item.js       # MongoDB Item model
│   └── routes/
│       └── items.js      # Item routes
├── package.json
└── README.md
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /status | Returns { status: "ok" } |
| GET | /items | Returns a list of all items |
| POST | /items | Creates a new item |
| DELETE | /items/:id | Deletes an item by ID |

## Server Setup

The service runs on three virtual machines:

1. API Server (tentamen.[alias].ikt-fag.no:10.12.[pool].201)
   - Runs on port 80
   - Mounts /var/docs and /var/logs from the document server

2. Database Server (mongodb.[alias].ikt-fag.no:10.12.[pool].202)
   - Runs MongoDB
   - Only accessible from the API server

3. Document Server (docs.[alias].ikt-fag.no:10.12.[pool].203)
   - Stores documents and logs
   - Exports /var/docs and /var/logs via NFS

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create .env file with the following variables:
   ```
   PORT=80
   MONGODB_URI=mongodb://10.12.202:27017/restful-api
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Logging

The API logs all requests to `/var/logs/api.log` in the format:
```
dd.mm.yyyy - /url
```

## Security

- MongoDB is only accessible from the API server
- NFS exports are restricted to the API server
- SSH access is limited to the API server 