from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

current_distance = 30  # Default value

@app.route('/')
def dashboard():
    return render_template('imde.html')

@app.route('/update', methods=['GET'])
def update_bin_status():
    global current_distance
    distance = request.args.get('distance', type=float)
    if distance:
        current_distance = distance
        return "Data Updated", 200
    return "Invalid Request", 400

@app.route('/get_data')
def get_data():
    return jsonify({"distance": current_distance})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
