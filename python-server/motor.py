#!/usr/bin/env python
# -*- coding:utf-8 -*-

from RPi import GPIO
from time import sleep
import val

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

def changeDuty(p, dc, time=0.02):
    p.ChangeDutyCycle(dc)         # 设置转动角度
    sleep(time)                   # 等该20ms周期结束
    p.ChangeDutyCycle(0)          # 归零信号

def changeAllDuty(dcX, dcY, time=0.02):
    p1.ChangeDutyCycle(dcX)       # 设置转动角度
    p2.ChangeDutyCycle(dcY)       # 设置转动角度
    sleep(time)                   # 等该20ms周期结束
    p1.ChangeDutyCycle(0)         # 归零信号
    p2.ChangeDutyCycle(0)         # 归零信号

# -90 <= x, y <= 90
def move(newX, newY):
    if val.lastX != newX or val.lastY != newY:
        val.x = newX
        val.y = newY
        #print '---- ' + str(val.x) + '  ' + str(val.y)
        tempHorizontal = 2.5 + (val.x + 90) / 18
        tempVertical = 2.5 + (val.y + 90) / 18
        #print str(tempHorizontal) + '  ' + str(tempVertical)
        if tempHorizontal >= 12.5:
            tempHorizontal = 12.5
        elif tempHorizontal <= 2.5:
            tempHorizontal = 2.5

        if tempVertical >= 12.5:
            tempVertical = 12.5
        elif tempVertical <= 2.5:
            tempVertical = 2.5

        val.horizontal = tempHorizontal
        val.vertical = tempVertical
        #val.steps.append({ 'horizontal': val.horizontal, 'vertical': val.vertical })
        #print str(val.horizontal) + '  ' + str(val.vertical)

def up():
    move(val.x, val.y - 1)
def down():
    move(val.x, val.y + 1)
def left():
    move(val.x - 1, val.y)
def right():
    move(val.x + 1, val.y)

def run():
    while True:
        if val.x != val.lastX or val.y != val.lastY:
            changeAllDuty(val.horizontal, val.vertical)
            val.lastX = val.x
            val.lastY = val.y
        else:
            sleep(0.02)
#GPIO.cleanup()
