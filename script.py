from flask import Flask, request, jsonify,render_template
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)


app.config['MYSQL_HOST'] = 'root@localhost'
app.config['MYSQL_USER'] = 'Josephine'
app.config['MYSQL_PASSWORD'] = '@j481240KK'
app.config['MYSQL_DB'] = 'fitness_db'

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = generate_password_hash(request.json['password'])
    gender = request.json['gender']
    height = request.json['height']
    weight = request.json['weight']
    age = request.json['age']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (username, password, gender, height, weight, age) VALUES (%s, %s, %s, %s, %s, %s)", 
                (username, password, gender, height, weight, age))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User registered successfully'})
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login()
    return render_template('sign.html')

@app.route('/record_workout')
def workout():
    return render_template('account.html')

@app.route('/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()

    if user and check_password_hash(user[2], password):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401
    
@app.route('/store_goal', methods=['POST'])
def store_goal():
    username = request.json['username']
    chosen_goal = request.json['chosen_goal']

    
    cur = mysql.connection.cursor()
    cur.execute("UPDATE users SET chosen_goal = %s WHERE username = %s", (chosen_goal, username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Goal stored successfully'})


@app.route('/get_profile', methods=['GET'])
def get_profile():
    username = request.args.get('username')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user_data = cur.fetchone()
    cur.close()

    return jsonify({'user_data': user_data})

@app.route('/record_workout', methods=['POST'])
def record_workout():
    username = request.json['username']
    exercise_type = request.json['exercise_type']
    reps = request.json['reps']
    sets = request.json['sets']
    time = request.json['time']

   
    valid_exercises = ['sit-ups', 'push-ups', 'squats', 'plank']
    if exercise_type.lower() not in valid_exercises:
        return jsonify({'message': 'Invalid exercise type'}), 400

    met_values = {
        'sit-ups': 3.5,
        'push-ups': 3.5,
        'squats': 4.0,
        'plank': 3.5
    }

    energy_expenditure = met_values.get(exercise_type.lower()) * time

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO workouts (username, exercise_type, reps, sets, time, energy_expenditure) VALUES (%s, %s, %s, %s, %s, %s)", 
                (username, exercise_type, reps, sets, time, energy_expenditure))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Workout recorded successfully'})

if __name__ == '_main_':
    app.run(debug=True)