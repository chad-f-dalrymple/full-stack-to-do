# To-Do Web Application

A full-stack to-do list application featuring a Python backend and a modern JavaScript frontend.

## Overview

This application provides a simple and intuitive interface for managing your daily tasks. It combines a Python backend (using SQLite for local development and PostgreSQL for production) with a JavaScript frontend.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- User-friendly interface
- Responsive design
- Local development environment
- Production-ready configuration for Heroku deployment

## Tech Stack

### Backend
- Python
- Flask (API framework)
- SQLite (local development database)
- PostgreSQL (production database on Heroku)

### Frontend
- JavaScript
- React
- Vite (development server and build tool)
- npm (package manager)

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.x
- Node.js (with npm)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/chad-f-dalrymple/to-do-web.git
   cd to-do-web
   ```

2. Set up the backend:
   ```
   cd backend
   
   # Optional: Create a virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip3 install -r requirements.txt
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

## Running the Application Locally

You need to run both the backend and frontend in separate terminal instances:

### Terminal 1 - Backend:
```
cd backend
python3 app.py
```
The backend API will start, typically on http://localhost:5000

### Terminal 2 - Frontend:
```
cd frontend
npm run dev
```
The frontend development server will start, typically on http://localhost:3000 or http://localhost:5173

Open your browser and navigate to the frontend URL to use the application.

## Development

### Backend Development
- The backend code is in the `backend` directory
- Database models are defined in the models.py file
- API routes are defined in app.py
- Local development uses SQLite which requires no additional configuration

### Frontend Development
- The frontend code is in the `frontend` directory
- Components are in the `src/components` directory
- Vite is used as the build tool and development server

## Deployment

This application is configured for deployment to Heroku:

1. The backend automatically detects the environment and uses PostgreSQL in production
2. A Procfile is included for Heroku deployment

### Heroku Deployment Steps:
1. Create a new Heroku app
2. Add the PostgreSQL add-on to your Heroku app
3. Connect your GitHub repository to the Heroku app
4. Deploy the main branch

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
