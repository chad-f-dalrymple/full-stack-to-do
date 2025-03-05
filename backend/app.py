from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
import os
from flask_apscheduler import APScheduler
from flask_migrate import Migrate

static_folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/dist'))
app = Flask(__name__, static_folder=static_folder_path, static_url_path='')
CORS(app)  # Enable CORS for frontend
scheduler = APScheduler()

uri = os.environ.get("DATABASE_URL")  # or other relevant config var
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

if uri:
    # Production Heroku
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
else:
    # Development (sqlite)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

migrate = Migrate(app, db)

# Define the To-Do model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String, nullable=False)

def init_db():
    """Initialize the database."""
    db.create_all()
    db.session.commit()

# Function to clear old todos
def clear_old_todos():
    with app.app_context():
        # Define the age threshold (e.g., 7 days)1
        threshold_date = datetime.utcnow() - timedelta(days=7)
        
        # Delete todos older than the threshold
        old_todos = Todo.query.filter(Todo.created_at < threshold_date).all()
        for todo in old_todos:
            db.session.delete(todo)
        
        db.session.commit()
        print(f"Cleared {len(old_todos)} old todos from database")


# add cron job to clear db
def init_scheduler():
    # Run job every day at midnight
    scheduler.add_job(id='clear_old_todos', func=clear_old_todos, trigger='cron', hour=0, minute=0)
    scheduler.start()

# API Routes
@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{"id": t.id, "title": t.title, "completed": t.completed, "priority": t.priority, "category": t.category} for t in todos])

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.json
    new_todo = Todo(title=data['title'], priority=data['priority'], category=data['category'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"message": "To-Do added!"}), 201

@app.route('/api/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Not found"}), 404
    data = request.json
    todo.title = data.get('title', todo.title)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify({"message": "To-Do updated!"})

@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "To-Do deleted!"})

@app.route('/debug-static')
def debug_static():
    result = {
        'static_folder': app.static_folder,
        'static_folder_exists': os.path.exists(app.static_folder),
        'files_in_static_folder': []
    }
    
    if result['static_folder_exists']:
        result['files_in_static_folder'] = os.listdir(app.static_folder)
        
        # Check for CSS files specifically
        result['css_files'] = [f for f in result['files_in_static_folder'] if f.endswith('.css')]
        
        # Check if index.html exists
        result['index_html_exists'] = 'index.html' in result['files_in_static_folder']
    
    return result

# Serve frontend static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Initialize the database
    with app.app_context():
        init_db()

    # Initialize and start the scheduler
    scheduler.init_app(app)
    init_scheduler()
    
    # Run the app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)