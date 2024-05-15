#!/bin/bash

# Start backend
echo "Starting FastAPI server..."
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 &

# # Start frontend
# echo "Install dependencies in client..."
# cd client && npm install
# npm run dev