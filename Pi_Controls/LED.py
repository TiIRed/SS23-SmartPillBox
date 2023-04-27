import RPi.GPIO as GPIO 
import time 

LED = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED, GPIO.OUT)


GPIO.output(LED, GPIO.HIGH)
print("LED ON")
time.sleep(2)

# GPIO.output(LED, GPIO.LOW)
# print("LED LOW")
GPIO.cleanup()