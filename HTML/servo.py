import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

servo_pin = 4
button_pin = 26
GPIO.setup(servo_pin, GPIO.OUT)
GPIO.setup(button_pin, GPIO.IN)

pwm = GPIO.PWM(servo_pin, 50)
# pwm.start(7.5)

# pwm.ChangeDutyCycle(1)
# time.sleep(1)

GPIO.setmode(GPIO.BCM)
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

state = 0

if __name__ == '__main__':
    while True:
        GPIO.wait_for_edge(button_pin, GPIO.FALLING, bouncetime = 50)
        print("Button pressed!")
        print(state)

        if state == 0:
            # pwm.ChangeDutyCycle(10)
            pwm.start(7.5)
            time.sleep(0.1)
            pwm.ChangeDutyCycle(0)
            state = 1
            continue
        elif state == 1: 
            pwm.ChangeDutyCycle(6)
            time.sleep(0.1)
            pwm.ChangeDutyCycle(0)
            state = 0
            
            continue