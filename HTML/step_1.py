#Code for the just one rotation of the stepper motor

import RPi.GPIO as GPIO
import time
 
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
coil_A_1_pin = 18 # pink
coil_A_2_pin = 23 # orange
coil_B_1_pin = 24 # blue
coil_B_2_pin = 25 # yellow
 
# adjust if different
StepCount = 8
Seq = r= [[0 for x in range(4)] for y in range(StepCount)] 
Seq[0] = [1,0,0,1]
Seq[1] = [1,0,0,0]
Seq[2] = [1,1,0,0]
Seq[3] = [0,1,0,0]
Seq[4] = [0,1,1,0]
Seq[5] = [0,0,1,0]
Seq[6] = [0,0,1,1]
Seq[7] = [0,0,0,1]
 
#GPIO.setup(enable_pin, GPIO.OUT)
GPIO.setup(coil_A_1_pin, GPIO.OUT)
GPIO.setup(coil_A_2_pin, GPIO.OUT)
GPIO.setup(coil_B_1_pin, GPIO.OUT)
GPIO.setup(coil_B_2_pin, GPIO.OUT)
 
#GPIO.output(enable_pin, 1)
 
def setStep(w1, w2, w3, w4):
    GPIO.output(coil_A_1_pin, w1)
    GPIO.output(coil_A_2_pin, w2)
    GPIO.output(coil_B_1_pin, w3)
    GPIO.output(coil_B_2_pin, w4)
 
def forward(delay, steps):
    for i in range(steps):
        for j in range(StepCount):
            setStep(Seq[j][0], Seq[j][1], Seq[j][2], Seq[j][3])
            time.sleep(delay)
 
def backwards(delay, steps):
    for i in range(steps):
        for j in reversed(range(StepCount)):
            setStep(Seq[j][0], Seq[j][1], Seq[j][2], Seq[j][3])
            time.sleep(delay)
 
if __name__ == '__main__':
   
    delay = 3
    #steps = input("How many steps forward? ")
    steps = 23.2727
    forward(int(delay) / 1000.0, int(steps))
    #steps = input("How many steps backwards? ")
    #backwards(int(delay) / 1000.0, int(steps))
 
#Code for the just one rotation of the stepper motor

import RPi.GPIO as GPIO
import time
 
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
coil_A_1_pin = 18 # pink
coil_A_2_pin = 23 # orange
coil_B_1_pin = 24 # blue
coil_B_2_pin = 25 # yellow
 
# adjust if different
StepCount = 8
Seq = r= [[0 for x in range(4)] for y in range(StepCount)] 
Seq[0] = [1,0,0,1]
Seq[1] = [1,0,0,0]
Seq[2] = [1,1,0,0]
Seq[3] = [0,1,0,0]
Seq[4] = [0,1,1,0]
Seq[5] = [0,0,1,0]
Seq[6] = [0,0,1,1]
Seq[7] = [0,0,0,1]
 
#GPIO.setup(enable_pin, GPIO.OUT)
GPIO.setup(coil_A_1_pin, GPIO.OUT)
GPIO.setup(coil_A_2_pin, GPIO.OUT)
GPIO.setup(coil_B_1_pin, GPIO.OUT)
GPIO.setup(coil_B_2_pin, GPIO.OUT)
 
#GPIO.output(enable_pin, 1)
 
def setStep(w1, w2, w3, w4):
    GPIO.output(coil_A_1_pin, w1)
    GPIO.output(coil_A_2_pin, w2)
    GPIO.output(coil_B_1_pin, w3)
    GPIO.output(coil_B_2_pin, w4)
 
def forward(delay, steps):
    for i in range(steps):
        for j in range(StepCount):
            setStep(Seq[j][0], Seq[j][1], Seq[j][2], Seq[j][3])
            time.sleep(delay)
 
def backwards(delay, steps):
    for i in range(steps):
        for j in reversed(range(StepCount)):
            setStep(Seq[j][0], Seq[j][1], Seq[j][2], Seq[j][3])
            time.sleep(delay)
 
if __name__ == '__main__':
   
    delay = 3
    #steps = input("How many steps forward? ")
    steps = 23.2727
    forward(int(delay) / 1000.0, int(steps))
    #steps = input("How many steps backwards? ")
    #backwards(int(delay) / 1000.0, int(steps))
 