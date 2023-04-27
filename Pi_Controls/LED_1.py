import RPi.GPIO as GPIO 
import time 

pin = 17,18 #Physical 11


def LED(pin, value):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pin, GPIO.OUT)
    
    if value == 0:
        GPIO.output(pin, GPIO.LOW)
        print("LED LOW")
        GPIO.cleanup()
    else: 
        GPIO.output(pin, GPIO.HIGH)
        print("LED ON")

    # GPIO.cleanup()



LED(pin,1)
