from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the To-Do model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime)
    dateCreated = db.Column(db.DateTime)

# Create the database tables
with app.app_context():
    db.drop_all()
    db.create_all()

# Routes
@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{"id": t.id, "title": t.title, "completed": t.completed, "date": t.date, "priority": t.priority} for t in todos])

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.json
    priority_str = data.get('priority')
    new_todo = Todo(title=data['title'], priority=priority_str)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"message": "To-Do added!"}), 201

@app.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Not found"}), 404
    data = request.json
        # Validate and parse date input
    date_str = data.get('date')
    print(date_str)
    if date_str:
        try:
            # Expecting a format like "YYYY-MM-DD HH:MM:SS"
            parsed_date = datetime.fromisoformat(date_str)
            todo.date = parsed_date
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD HH:MM:SS"}), 400
    todo.title = data.get('title', todo.title)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify({"message": "To-Do updated!"})

@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "To-Do deleted!"})

@app.route('/todos/clear', methods=['GET'])
def delete_todo_all():
    todo = Todo.query.all()
    if not todo:
        return jsonify({"error": "Not Found"}), 404
    db.session.clear()
    db.session.commit()
    return jsonify({"message": "List cleared"})



if __name__ == '__main__':
    app.run(debug=True)