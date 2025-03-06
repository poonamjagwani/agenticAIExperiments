# Simple Todo Application

A minimalist, full-stack todo application built with Node.js and vanilla JavaScript that helps users manage their daily tasks efficiently.

## Features

- Create, read, update, and delete todo items
- Mark todos as complete/incomplete
- Filter todos by status (All/Active/Completed)
- Clean, responsive user interface
- RESTful API backend
- Persistent storage using JSON file

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- File-based JSON storage
- CORS enabled for frontend communication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mytodolist3
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The server will start on http://localhost:3000

2. Access the application:
Open http://localhost:3000 in your web browser

## API Endpoints

| Method | Endpoint      | Description             |
|--------|--------------|-------------------------|
| GET    | /tasks       | Get all todos          |
| POST   | /task        | Create a new todo      |
| PUT    | /task/:id    | Update a todo          |
| DELETE | /task/:id    | Delete a todo          |

## Project Structure
```
mytodolist3/
├── frontend/           # Frontend static files
│   ├── index.html     # Main HTML file
│   ├── styles.css     # Styles
│   └── app.js         # Frontend JavaScript
└── backend/           # Backend server
    ├── server.js      # Express server setup
    ├── routes/        # API route handlers
    └── data/          # Data storage
        └── tasks.json # Todo items storage
```

## Error Handling

The application includes comprehensive error handling:
- Input validation for todo items
- API error responses with appropriate status codes
- Frontend error display for failed operations
- Maximum character limit (200) for todo text

## Future Enhancements

- Edit todo text
- Clear all completed todos
- Todo count indicators
- Data persistence with a proper database
- User authentication
- Task categories/tags

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.