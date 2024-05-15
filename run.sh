#!/bin/bash

# Start backend
echo "Starting FastAPI server..."
cd backend
uvicorn src.main:app --port 8000 &

cd ..
# Start frontend
echo "Start client..."
cd client
npm run dev