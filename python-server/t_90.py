#!/usr/bin/env python
# -*- coding:utf-8 -*-

from RPi import GPIO
from time import sleep

s1 = 24  # up
s2 = 23  # left

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(s1, GPIO.OUT)
GPIO.setup(s2, GPIO.OUT)
p1 = GPIO.PWM(s1, 50)  # 50HZ
p2 = GPIO.PWM(s2, 50)  # 50HZ
p1.start(0)
p2.start(0)
sleep(1)

def getHorizontal():
    return val.horizontal

def getVertical():
    return val.vertical

def cleanup():
    GPIO.cleanup()

def changeDuty(p, dc, time=0.2):
    p.ChangeDutyCycle(dc)         # 设置转动角度
    sleep(time)                   # 等该20ms周期结束
    p.ChangeDutyCycle(0)          # 归零信号

def changeAllDuty(dcX, dcY, time=0.02):
    p1.ChangeDutyCycle(dcX)        # 设置转动角度
    p2.ChangeDutyCycle(dcY)        # 设置转动角度
    sleep(time)                    # 等该20ms周期结束
    p1.ChangeDutyCycle(0)          # 归零信号
    p2.ChangeDutyCycle(0)          # 归零信号


# 0 <= x, y <= 180
def move(newX, newY):
    val.isMoving = True
    val.x = newX
    val.y = newY
    val.horizontal = 0.5 + x / 90
    val.vertical = 0.5 + y / 90

def stop():
    val.isMoving = False

# while(True):
def left():
    if val.horizontal + 0.5 <= 12.5:
        val.horizontal += 0.5
        changeDuty(p1, val.horizontal)


def right():
    if val.horizontal - 0.5 >= 2.5:
        val.horizontal -= 0.5
        changeDuty(p1, val.horizontal)


def down():
    if val.vertical + 0.5 <= 12.5:
        val.vertical += 0.5
        changeDuty(p2, val.vertical)


def up():
    if val.vertical - 0.5 >= 2.5:
        val.vertical -= 0.5
        changeDuty(p2, val.vertical)

def run():
    while True:
        if val.isMoving == True:
            changeAllDuty(val.horizontal, val.vertical)
            sleep(0.02)

#while(True):
#    cwd = raw_input('say:')
#    if cwd == 'a':
#        left()
#    elif cwd == 'd':
#        right()
#    elif cwd == 'w':
#        up()
#    elif cwd == 's':
#        down()
#    else:
#        test(float(cwd))
#    sleep(0.2)

    # right()
#  for i in range(181,0,-10):
#    p.ChangeDutyCycle(2.5 + 10 * i / 180)
#    time.sleep(0.02)
#    p.ChangeDutyCycle(0)
#    time.sleep(0.2)

#GPIO.cleanup()
