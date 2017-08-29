import eventlet
from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

count = 0

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode="eventlet")

@socketio.on('connect')
def chat_connect():
    print ('connected')

@socketio.on('disconnect')
def chat_disconnect():
    print ("Client disconnected")

@socketio.on('message')
def handle_message(message):
    global count
    if message == 'up':
        count = count + 1
        print count
        emit('message', count, include_self=True)
    elif message == 'down':
        count = count - 1
        print count
        emit('message', count, include_self=True)
    print('received message: ' + message)

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0')
    socketio.run(app)