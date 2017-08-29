from flask import Flask
import threading
import t_90
#from

root_path = '/gpio'

motor = t_90

app = Flask(__name__)
@app.route(root_path)
def hello():
    print t_90
    return 'Hello World!'

@app.route(root_path + '/left')
def left():
    motor.move(7.5, 7.5)
    return 'left'

@app.route(root_path + '/right')
def right():
    motor.stop()
    return 'right'

@app.route(root_path + '/up')
def up():
    motor.up()
    return 'up'

@app.route(root_path + '/down')
def down():
    motor.down()
    return 'down'


if __name__ == '__main__':
    t = threading.Thread(target=motor.run)
    t.setDaemon(True)
    t.start()
    app.run()
    print 'start server'
