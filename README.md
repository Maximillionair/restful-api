# RESTful API Service

This is a RESTful API service built with Node.js, Express, and MongoDB for the Firetimers assignment.

# Passwords
The users on the different VMs have sadly not been set up with keys.
but your user is : superpadde . password : Passord!
(jeg vet det ikke er smart å legge det her men jeg har dårlig tid og må levere, beklager).


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

1. API Server (tentamen.gerty.ikt-fag.no:10.12.10.201)
   - Runs on port 80
   - Mounts /var/docs and /var/logs from the document server

2. Database Server (mongodb.gerty.ikt-fag.no:10.12.10.202)
   - Runs MongoDB
   - Only accessible from the API server

3. Document Server (docs.gerty.ikt-fag.no:10.12.10.203)
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
   MONGODB_URI=mongodb://10.12.10.202:27017/restful-api
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