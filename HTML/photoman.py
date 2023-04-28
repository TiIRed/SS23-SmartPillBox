import psycopg2
import RPi.GPIO as GPIO 
from libcamera import controls
from picamera2 import Picamera2
import sys

pin = 17,18

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

if len(sys.argv) > 1:
# GPIO.output(LED, GPIO.LOW)
# print("LED LOW")

    LED(pin,1)
    filename = "thumbnail.jpg"
    #save picture
    picam2 = Picamera2()
    picam2.set_controls({"AfMode": controls.AfModeEnum.Auto, "AfRange": controls.AfRangeEnum.Macro, "AfSpeed": controls.AfSpeedEnum.Fast})
    camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)})
    picam2.configure(camera_config)
    picam2.start()
    picam2.capture_file(filename) 


    # create PSQL Query Object
    conn = psycopg2.connect(
        host="10.203.156.73",
        database="pillbox",
        user="sfransen",
        password="$tephenO0"
    )
    cur = conn.cursor()

    #Read picture file and convert to bytes
    with open(filename, "rb")as image:
        f = image.read()
        j = list(f)

    cur.execute("SELECT id FROM photos WHERE time = %s AND username = %s AND dayofweek = %s", (sys.argv[1], sys.argv[2], sys.argv[3]))
    photos = cur.fetchall()
    if photos:
        cur.execute("UPDATE photos SET data = %s WHERE time = %s AND username = %s AND dayofweek = %s", (f,sys.argv[1], sys.argv[2], sys.argv[3]))
    #send to DB
    else:
        cur.execute("INSERT INTO photos (time, data, username, dayofweek) VALUES (%s, %s,%s, %s)", (sys.argv[1], f, sys.argv[2],sys.argv[3]))

    #close currsor
    conn.commit()
    cur.close()
    conn.close()
    GPIO.cleanup()
else:
    print("pass arguments such that photoman.py time username dayofweek ")