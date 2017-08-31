#!/usr/bin/env python
# -*- coding:utf-8 -*-
import commands 

def get_cpu_temp():
    tempFile = open('/sys/class/thermal/thermal_zone0/temp' )
    cpu_temp = tempFile.read()
    tempFile.close()
    return float(cpu_temp) / 1000

def get_gpu_temp():
    gpu_temp = commands.getoutput('/opt/vc/bin/vcgencmd measure_temp' ).replace( 'temp=', '' ).replace( '\'C', '' )
    return  float(gpu_temp)
